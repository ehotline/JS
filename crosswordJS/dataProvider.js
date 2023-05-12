function getGrid() {
    return {
        words: getWords(),
        letters: getLetters()
    }
}

function getWords() {
    const words = [
        new Word(1, 'Сапоги', 0, 'Вид обуви, предназначенный для влажной и холодной погоды.'),
        new Word(2, 'Топор', 1, 'Инструмент для рубки дерева. Миниатюрная версия этого инструмента также использовалась как метательное оружие.'),
        new Word(3, 'Пергамент', 1, 'Материал для письма из недублёной сыромятной кожи животных (до изобретения бумаги).'),
        new Word(4, 'Харам', 0, 'В шариате - греховные деяния, запрещённые в исламе.'),
    ]
    return words
}

function getLetters() {
    var idCounter = 1
    const letters = []
    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 6; j++, idCounter++) {
            var id = idCounter
            var verticalWordId = -1
            var verticalIndex = -1
            var horizontalWordId = -1
            var horizontalIndex = -1
            var row = i
            var column = j
            switch (i) {
                case 1:
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 0
                    }
                    break
                case 2:
                    if (j == 3) {
                        verticalWordId = 2
                        verticalIndex = 0
                    }
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 1
                    }
                    break
                case 3:
                    if (j == 3) {
                        verticalWordId = 2
                        verticalIndex = 1
                    }
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 2
                    }
                    break
                case 4:
                    if (j == 1) {
                        horizontalWordId = 1
                        horizontalIndex = 0
                    }
                    if (j == 2) {
                        horizontalWordId = 1
                        horizontalIndex = 1
                    }
                    if (j == 3) {
                        horizontalWordId = 1
                        horizontalIndex = 2
                        verticalWordId = 2
                        verticalIndex = 2
                    }
                    if (j == 4) {
                        horizontalWordId = 1
                        horizontalIndex = 3
                    }
                    if (j == 5) {
                        horizontalWordId = 1
                        horizontalIndex = 4
                        verticalWordId = 3
                        verticalIndex = 3
                    }
                    if (j == 6) {
                        horizontalWordId = 1
                        horizontalIndex = 5
                    }
                    break
                case 5:
                    if (j == 3) {
                        verticalWordId = 2
                        verticalIndex = 3
                    }
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 4
                    }
                    break
                case 6:
                    if (j == 1) {
                        horizontalWordId = 4
                        horizontalIndex = 0
                    }
                    if (j == 2) {
                        horizontalWordId = 4
                        horizontalIndex = 1
                    }
                    if (j == 3) {
                        horizontalWordId = 4
                        horizontalIndex = 2
                        verticalWordId = 2
                        verticalIndex = 4
                    }
                    if (j == 4) {
                        horizontalWordId = 4
                        horizontalIndex = 3
                    }
                    if (j == 5) {
                        horizontalWordId = 4
                        horizontalIndex = 4
                        verticalWordId = 3
                        verticalIndex = 5
                    }
                    break
                case 7:
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 6
                    }
                    break
                case 8:
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 7
                    }
                    break
                case 9:
                    if (j == 5) {
                        verticalWordId = 3
                        verticalIndex = 8
                    }
                    break
            }

            var letter = new Letter(id, verticalWordId, verticalIndex, horizontalWordId, horizontalIndex, row, column)
            letters.push(letter)
        }
    }
    return letters
}