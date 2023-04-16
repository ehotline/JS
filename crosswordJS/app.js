const letterBoxIdPrefix = 'LetterBox'
const columnsAmount = 6
const size = '50px'
var selectedLetterBox
var selectedWord
/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
container.style.gridTemplateColumns = `repeat(${columnsAmount}, ${size})`
document.addEventListener('keypress', (e) => keyPress(e))

const { words, letterBoxes } = getGrid()
try {
    generateLayout()
} catch (error) {
    console.log(error);
}

function generateLayout() {
    letterBoxes.some(letterBox => {
        const div = document.createElement('div')
        div.style.width = div.style.height = size
        div.id = letterBoxIdPrefix + letterBox.Id
        var text = ''
        if (letterBox.LetterIndex.length > 0) {
            div.className = 'letterBox'
            div.addEventListener('click', (e) => onClick(e.target.id))
            var wordId = letterBox.WordId[0]
            var letterIndex = letterBox.LetterIndex[0]
            text = words.find(w => w.Id == wordId).Text[letterIndex].toUpperCase()
        }
        div.textContent = `${text}`
        container.appendChild(div)
    })
}

function onClick(id) {
    const newSelectedLetterBox = letterBoxes.find(l => l.Id == id.replace(letterBoxIdPrefix, ''))
    const isLetterBoxChanged = selectedLetterBox ? selectedLetterBox != newSelectedLetterBox : true
    selectedLetterBox = newSelectedLetterBox

    if (!selectedWord) {
        selectWord(selectedLetterBox.WordId[0])
    } else if (!isLetterBoxChanged && selectedLetterBox.WordId.length > 1 && selectedLetterBox.WordId.includes(selectedWord.Id)) {
        selectWord(selectedLetterBox.WordId.find(w => w != selectedWord.Id))
    } else if (!selectedLetterBox.WordId.includes(selectedWord.Id)) {
        selectWord(selectedLetterBox.WordId[0])
    }
}

function selectWord(wordId) {
    if (selectedWord) {
        var letters = letterBoxes.filter(l => l.WordId.includes(selectedWord.Id))
        letters.forEach(letter => {
            var letterBox = container.querySelector(`#${letterBoxIdPrefix + letter.Id}`)
            letterBox.classList.remove('letterBoxSelected')
        })
    }
    selectedWord = words.find(w => w.Id == wordId)
    var letters = letterBoxes.filter(l => l.WordId.includes(selectedWord.Id))
    letters.forEach(letter => {
        var letterBox = container.querySelector(`#${letterBoxIdPrefix + letter.Id}`)
        letterBox.classList.add('letterBoxSelected')
    })
}

function keyPress(e) {

}