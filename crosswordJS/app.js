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
    
    if (selectedWord) {
        console.log(selectedWord.Id);
        console.log(selectedLetterBox.WordId[0]);
        console.log(isLetterBoxChanged);
        console.log(selectedLetterBox.WordId.length > 1);
        if (!isLetterBoxChanged && selectedLetterBox.WordId.length > 1) {
            if (selectedWord.Id == selectedLetterBox.WordId[0]) {
                selectWord(selectedLetterBox.WordId[1])
            } else {
                selectWord(selectedLetterBox.WordId[0])
            }
        }
        if (selectedWord.Id == selectedLetterBox.WordId[0] && !isLetterBoxChanged && selectedLetterBox.WordId.length > 1) {
            selectWord(selectedLetterBox.WordId[1])
        }
    } else {
        selectWord(selectedLetterBox.WordId[0])
    }
    // if (selectedWord && selectedWord.Id == selectedLetterBox.WordId[0] && selectedLetterBox.WordId.length > 1 && !isLetterBoxChanged) {
    //     selectWord(selectedLetterBox.WordId[1])
    // } else {
    //     selectWord(selectedLetterBox.WordId[0])
    // }
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