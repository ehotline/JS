const letterBoxIdPrefix = 'LetterBox'
const columnsAmount = 6
const size = '50px'
/** @type {Letter} */
var selectedLetter
/** @type {Word} */
var selectedWord
/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
container.style.gridTemplateColumns = `repeat(${columnsAmount}, ${size})`
document.addEventListener('keydown', (e) => onKeyPress(e))
document.addEventListener('click', (e) => onDocumentClick(e))

const { words, letters } = getGrid()
try {
    generateLayout()
} catch (error) {
    console.log(error)
}

function generateLayout() {
    letters.some(letter => {
        const letterBox = document.createElement('div')
        letterBox.style.width = letterBox.style.height = size
        letterBox.id = letterBoxIdPrefix + letter.Id
        if (!letter.isEmpty()) {
            letterBox.className = 'letterBox'
            letterBox.addEventListener('click', (e) => onLetterBoxClick(e.target.id))
        }
        container.appendChild(letterBox)
    })
}

function onDocumentClick(e) {
    if (selectedWord) {
        var selectedLetters = letters.filter(l => l.isPartOfWord(selectedWord.Id))
        var isOutside = !selectedLetters.some(letter => {
            if (getLetterBoxById(letter.Id).contains(e.target)) {
                return true
            }
        })
        if (isOutside) {
            unselectWord()
            unselectLetter()
        }
    }
}

function onLetterBoxClick(divId) {
    const id = divId.replace(letterBoxIdPrefix, '')
    const newSelectedLetter = letters.find(l => l.Id == id)
    const isLetterBoxChanged = selectedLetter ? selectedLetter != newSelectedLetter : true
    if (isLetterBoxChanged) {
        selectLetter(newSelectedLetter)
    }
    if (selectedWord && !isLetterBoxChanged && selectedLetter.isDoubleWord() && selectedLetter.isPartOfWord(selectedWord.Id)) {
        if (selectedWord.Id == selectedLetter.VerticalWordId) {
            selectWord(words.find(w => w.Id == selectedLetter.HorizontalWordId))
        } else {
            selectWord(words.find(w => w.Id == selectedLetter.VerticalWordId))
        }
    } else if (!selectedWord || !selectedLetter.isPartOfWord(selectedWord.Id)) {
        if (selectedLetter.isVertical()) {
            selectWord(words.find(w => w.Id == selectedLetter.VerticalWordId))
        } else {
            selectWord(words.find(w => w.Id == selectedLetter.HorizontalWordId))
        }
    }
}

function selectWord(word) {
    if (selectedWord) {
        unselectWord()
    }
    selectedWord = words.find(w => w.Id == word.Id)
    var selectedLetters = letters.filter(l => l.isPartOfWord(selectedWord.Id))
    selectedLetters.forEach(letter => {
        var letterBox = getLetterBoxById(letter.Id)
        letterBox.classList.add('wordSelected')
    })
}

function unselectWord() {
    var selectedLetters = letters.filter(l => l.isPartOfWord(selectedWord.Id))
    selectedLetters.forEach(letter => {
        var letterBox = getLetterBoxById(letter.Id)
        letterBox.classList.remove('wordSelected')
        if (!letter.Solved) {
            letterBox.textContent = ''
        }
    })
    selectedWord = null
}

function solveWord(word) {
    word.Solved = true
    letters.some(l => {
        if (l.isPartOfWord(selectedWord.Id)) {
            solveLetter(l)
        }
    })
    unselectWord()
    unselectLetter()
}

function clearWord(word) {
    var wordLetters = letters.filter(l => l.isPartOfWord(word.Id))
    wordLetters.forEach(letter => {
        var letterBox = getLetterBoxById(letter.Id)
        if (!letter.Solved) {
            letterBox.textContent = ''
        }
    })
}

function selectLetter(letter) {
    if (selectedLetter) {
        unselectLetter(selectedLetter)
    }
    const letterBox = getLetterBoxById(letter.Id)
    letterBox.classList.add('letterBoxSelected')
    selectedLetter = letters.find(l => l.Id == letter.Id)
}

function unselectLetter() {
    const letterBox = getLetterBoxById(selectedLetter.Id)
    letterBox.classList.remove('letterBoxSelected')
    selectedLetter = null
}

function solveLetter(letter) {
    letter.Solved = true
    const letterBox = getLetterBoxById(letter.Id)
    letterBox.classList.add('letterBoxSolved')
}

function onKeyPress(e) {
    if (selectedLetter) {
        if (isLetter(e.key)) {
            if (!selectedLetter.Solved) {
                const letterBox = getLetterBoxById(selectedLetter.Id)
                letterBox.textContent = e.key.toUpperCase()
            }
            const nextLetter = getNextLetter(selectedWord, selectedLetter)
            if (nextLetter != selectedLetter) {
                selectLetter(nextLetter)
            }
        }
        if (e.key == 'Backspace') {
            if (!selectedLetter.Solved) {
                const letterBox = getLetterBoxById(selectedLetter.Id)
                letterBox.textContent = ''
            }
            const previousLetter = getPreviousLetter(selectedWord, selectedLetter)
            if (previousLetter != selectedLetter) {
                selectLetter(previousLetter)
            }
        }
    }
    if (e.key == 'Enter') {
        if (checkWord(selectedWord)) {
            solveWord(selectedWord)
        } else {
            clearWord(selectedWord)
            if(selectedWord.isVertical()) {
                selectLetter(letters.find(l => l.VerticalWordId == selectedWord.Id && l.VerticalIndex == 0))
            } else {
                selectLetter(letters.find(l => l.HorizontalWordId == selectedWord.Id && l.HorizontalIndex == 0))
            }
        }
    }
}

function isLetter(symbol) {
    return /[а-я]/i.test(symbol)
}

function getLetterBoxById(letterId) {
    return container.querySelector(`#${letterBoxIdPrefix + letterId}`)
}

function checkWord(word) {
    const wordLetters = letters.filter(l => l.isPartOfWord(word.Id))
    var result = true
    wordLetters.forEach(l => {
        const letterBox = getLetterBoxById(l.Id)
        const index = word.isVertical() ? l.VerticalIndex : l.HorizontalIndex
        if (word.Text[index].toUpperCase() != letterBox.textContent[0]) {
            result = false
        }
    })
    return result
}