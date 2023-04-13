const cars = ['Mazda', 'Ford', 'BMW', 'Mercedes']
const fib = [1, 1, 2, 3, 5, 8, 13]
const people = [
    { name: 'Dima', budget: 4200 },
    { name: 'Elena', budget: 3500 },
    { name: 'Vika', budget: 1500 }
]

console.log(cars)
cars.push('Renault')
console.log(cars)
var car = cars.shift()
console.log(cars)
cars.unshift(car)
console.log(cars)
cars.pop()
console.log(cars)
cars.reverse()
console.log(cars)
console.log(cars.indexOf('BMW'))
var index = people.findIndex(p => p.budget == 1500)
console.log(people)
console.log(index)

var str = "Привет, мы изучаем JavaScript"
console.log(str.split('').reverse().join(''))
