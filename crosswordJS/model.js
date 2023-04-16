function getGrid() {
    return {
        words: getWords(),
        letters: getLetters()
    }
}

function getWords() {
    return [
        {
            Id: 1,
            Text: 'Сапоги',
            Description: 'Вид обуви, предназначенный для влажной и холодной погоды.'
        },
        {
            Id: 2,
            Text: 'Топор',
            Description: 'Инструмент для рубки дерева. Миниатюрная версия этого инструмента также использовалась как метательное оружие.'
        },
        {
            Id: 3,
            Text: 'Пергамент',
            Description: 'Материал для письма из недублёной сыромятной кожи животных (до изобретения бумаги).'
        },
        {
            Id: 4,
            Text: 'Харам',
            Description: 'В шариате - грезовные деяния, запрещённые в исламе.'
        }]
}

function getLetters() {
    var counter = 1;
    var letters = [];
    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 6; j++, counter++) {
            var id = counter
            var wordId = []
            var letterIndex = []
            var row = i
            var column = j
            switch (i) {
                case 1:
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(0)
                    }
                    break
                case 2:
                    if (j == 3) {
                        wordId.push(2)
                        letterIndex.push(0)
                    }
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(1)
                    }
                    break
                case 3:
                    if (j == 3) {
                        wordId.push(2)
                        letterIndex.push(1)
                    }
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(2)
                    }
                    break
                case 4:
                    if (j == 1) {
                        wordId.push(1)
                        letterIndex.push(0)
                    }
                    if (j == 2) {
                        wordId.push(1)
                        letterIndex.push(1)
                    }
                    if (j == 3) {
                        wordId.push(1)
                        letterIndex.push(2)
                        wordId.push(2)
                        letterIndex.push(2)
                    }
                    if (j == 4) {
                        wordId.push(1)
                        letterIndex.push(3)
                    }
                    if (j == 5) {
                        wordId.push(1)
                        letterIndex.push(4)
                        wordId.push(3)
                        letterIndex.push(3)
                    }
                    if (j == 6) {
                        wordId.push(1)
                        letterIndex.push(5)
                    }
                    break
                case 5:
                    if (j == 3) {
                        wordId.push(2)
                        letterIndex.push(3)
                    }
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(4)
                    }
                    break
                case 6:
                    if (j == 1) {
                        wordId.push(4)
                        letterIndex.push(0)
                    }
                    if (j == 2) {
                        wordId.push(4)
                        letterIndex.push(1)
                    }
                    if (j == 3) {
                        wordId.push(4)
                        letterIndex.push(2)
                        wordId.push(2)
                        letterIndex.push(4)
                    }
                    if (j == 4) {
                        wordId.push(4)
                        letterIndex.push(3)
                    }
                    if (j == 5) {
                        wordId.push(4)
                        letterIndex.push(4)
                        wordId.push(3)
                        letterIndex.push(5)
                    }
                    break
                case 7:
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(6)
                    }
                    break
                case 8:
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(7)
                    }
                    break
                case 9:
                    if (j == 5) {
                        wordId.push(3)
                        letterIndex.push(8)
                    }
                    break
            }

            var letter = {
                Id: id,
                WordId: wordId,
                LetterIndex: letterIndex,
                Row: row,
                Column: column
            }
            letters.push(letter)
        }
    }
    return letters
}