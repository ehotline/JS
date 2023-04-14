/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
const columnsAmount = 6
const size = '50px'
container.style.gridTemplateColumns = `repeat(${columnsAmount}, ${size})`

const {words, letterBoxes} = getGrid()
try {
    generateLayout()
} catch (error) {
    console.log(error);
}

function generateLayout() {
    letterBoxes.some(letterBox => {
            const div = document.createElement('div')
            div.style.width = div.style.height = size
            div.className = 'letterBox'
            div.id = `LetterBox${letterBox.Id}`
            var text = ''
            if(letterBox.LetterIndex.length > 0){
                div.style.backgroundColor = '#1144AA'
                div.style.borderWidth = '2px'
                var wordId = letterBox.WordId[0]
                var letterIndex = letterBox.LetterIndex[0]
                text = words.find(w => w.Id == wordId).Text[letterIndex].toUpperCase()
            }
            div.textContent = `${text}`
            container.appendChild(div)
    })
}