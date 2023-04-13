/** @type {HTMLDivElement} */
const container = document.querySelector('#crosswordContainer')
const columnsAmount = 6
container.style.gridTemplateColumns = `repeat(${columnsAmount}, 50px)`
var counter = 0

generateLayout(6, 7)


function generateLayout(columnsAmount, rowsAmount) {
    for (var i = 0; i < columnsAmount; i++) {
        for (var j = 0; j < rowsAmount; j++) {
            const div = document.createElement('div')
            div.className = 'letterBox'
            div.id = `${counter}`
            div.textContent = div.id
            container.appendChild(div)
            counter++
        }
    }
}