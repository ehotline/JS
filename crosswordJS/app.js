const letterBoxIdPrefix = 'LetterBox'
const columnsAmount = 6
const size = '50px'
var selectedLetter
var selectedWord
/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
container.style.gridTemplateColumns = `repeat(${columnsAmount}, ${size})`
document.addEventListener('keypress', (e) => onKeyPress(e))

const { words, letters } = getGrid()
try {
    generateLayout()
} catch (error) {
    console.log(error);
}

function generateLayout() {
    letters.some(letter => {
        const letterBox = document.createElement('div')
        letterBox.style.width = letterBox.style.height = size
        letterBox.id = letterBoxIdPrefix + letter.Id
        if (letter.LetterIndex.length > 0) {
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
    if(isLetterBoxChanged) {
        selectedLetter = selectLetter(id)
    }
    if (selectedWord && !isLetterBoxChanged && selectedLetter.WordId.length > 1 && selectedLetter.WordId.includes(selectedWord.Id)) {
        selectWord(selectedLetter.WordId.find(w => w != selectedWord.Id))
    } else if (!selectedWord || !selectedLetter.WordId.includes(selectedWord.Id)) {
        selectWord(selectedLetter.WordId[0])
    }
}

function selectWord(id) {
    if (selectedWord) {
        var selectedLetters = letters.filter(l => l.WordId.includes(selectedWord.Id))
        selectedLetters.forEach(letter => {
            var letterBox = container.querySelector(`#${letterBoxIdPrefix + letter.Id}`)
            letterBox.classList.remove('wordSelected')
        })
    }
    selectedWord = words.find(w => w.Id == id)
    var selectedLetters = letters.filter(l => l.WordId.includes(selectedWord.Id))
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
    if(selectedLetter && isLetter(e.key)) {
        const letterBox = container.querySelector(`#${letterBoxIdPrefix + selectedLetter.Id}`)
        letterBox.textContent = e.key.toUpperCase()
        if (selectedWord.Text.length - 1 > selectedLetter.LetterIndex) {
            const nextLetter = letters.find(l => l.LetterIndex == selectedLetter.LetterIndex + 1 && l.WordId.includes(selectedWord.Id))
            console.log(selectedLetter.LetterIndex);
            console.log(selectedWord);
            console.log(nextLetter);
            //selectLetter(nextLetter)
        }
    }
}

function isLetter(letter) {
    return /[а-я]/i.test(letter)
}