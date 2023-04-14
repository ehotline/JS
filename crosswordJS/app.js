/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
const columnsAmount = 6
const rowsAmount = 9
container.style.gridTemplateColumns = `repeat(${columnsAmount}, 60px)`

const {words, letterBoxes} = getGrid()
try {
    generateLayout()
} catch (error) {
    console.log(error);
}

function generateLayout() {
    letterBoxes.some(letterBox => {
            const div = document.createElement('div')
            div.className = 'letterBox'
            div.id = `LetterBox${letterBox.Id}`
            var text = ''
            if(letterBox.LetterIndex.length > 0){
                var wordId = letterBox.WordId[0]
                var letterIndex = letterBox.LetterIndex[0]
                text = words.find(w => w.Id == wordId).Text[letterIndex].toUpperCase()
            }
            div.textContent = `${text}`
            container.appendChild(div)
    })
}