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
document.addEventListener('keypress', (e) => onKeyPress(e))

const { words, letters } = getGrid()
try {
    generateLayout()
    //console.log(words)
    //console.log(letters)
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

function onLetterBoxClick(divId) {
    const id = divId.replace(letterBoxIdPrefix, '')
    const newSelectedLetter = letters.find(l => l.Id == id)
    const isLetterBoxChanged = selectedLetter ? selectedLetter != newSelectedLetter : true
    if (isLetterBoxChanged) {
        selectedLetter = selectLetter(id)
    }
    if (selectedWord && !isLetterBoxChanged && selectedLetter.isDoubleWord() && selectedLetter.isPartOfWord(selectedWord.Id)) {
        if (selectedWord.Id == selectedLetter.VerticalWordId) {
            selectWord(selectedLetter.HorizontalWordId)
        } else {
            selectWord(selectedLetter.VerticalWordId)
        }
    } else if (!selectedWord || !selectedLetter.isPartOfWord(selectedWord.Id)) {
        if (selectedLetter.isVertical()) {
            selectWord(selectedLetter.VerticalWordId)
        } else {
            selectWord(selectedLetter.HorizontalWordId)
        }
    }
}

function selectWord(id) {
    if (selectedWord) {
        var selectedLetters = letters.filter(l => l.isPartOfWord(selectedWord.Id))
        selectedLetters.forEach(letter => {
            var letterBox = container.querySelector(`#${letterBoxIdPrefix + letter.Id}`)
            letterBox.classList.remove('wordSelected')
        })
    }
    selectedWord = words.find(w => w.Id == id)
    var selectedLetters = letters.filter(l => l.isPartOfWord(selectedWord.Id))
    selectedLetters.forEach(letter => {
        var letterBox = container.querySelector(`#${letterBoxIdPrefix + letter.Id}`)
        letterBox.classList.add('wordSelected')
    })
}

function selectLetter(id) {
    if (selectedLetter) {
        const oldLetterBox = container.querySelector(`#${letterBoxIdPrefix + selectedLetter.Id}`)
        oldLetterBox.classList.remove('letterBoxSelected')
    }
    const letterBox = container.querySelector(`#${letterBoxIdPrefix + id}`)
    letterBox.classList.add('letterBoxSelected')
    return letters.find(l => l.Id == id)
}

function onKeyPress(e) {
    if (selectedLetter && isLetter(e.key)) {
        const letterBox = container.querySelector(`#${letterBoxIdPrefix + selectedLetter.Id}`)
        letterBox.textContent = e.key.toUpperCase()
        const letterIndex = selectedLetter.isVertical ? selectedLetter.VerticalIndex : selectedLetter.HorizontalIndex
        if (selectedWord.Text.length - 1 > letterIndex) {
            const nextLetter = letters.find(l => l.LetterIndex == letterIndex + 1 && l.WordId.includes(selectedWord.Id))
            console.log(letterIndex);
            console.log(selectedWord);
            console.log(nextLetter);
            //selectLetter(nextLetter)
        }
    }
}

function isLetter(letter) {
    return /[а-я]/i.test(letter)
}