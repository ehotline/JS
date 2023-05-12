class Letter {
    constructor(id, verticalWordId, verticalIndex, horizontalWordId, horizontalIndex, row, column) {
        this.Id = id
        this.VerticalWordId = verticalWordId
        this.VerticalIndex = verticalIndex
        this.HorizontalWordId = horizontalWordId
        this.HorizontalIndex = horizontalIndex
        this.Row = row
        this.Column = column
        this.Solved = false
    }

    isEmpty() {
        if (this.VerticalWordId != -1 || this.HorizontalWordId != -1) {
            return false
        } else {
            return true
        }
    }

    isVertical() {
        if (this.VerticalWordId != -1) {
            return true
        } else {
            return false
        }
    }

    isHorizontal() {
        if (this.HorizontalWordId != -1) {
            return true
        } else {
            return false
        }
    }

    isDoubleWord() {
        if (this.VerticalWordId != -1 && this.HorizontalWordId != -1) {
            return true
        } else {
            return false
        }
    }

    isPartOfWord(wordId) {
        if (this.VerticalWordId == wordId || this.HorizontalWordId == wordId) {
            return true
        } else {
            return false
        }
    }
}

function getNextLetter(word, letter) {
    var nextLetter
    const nextLetterIndex = word.isVertical() ? letter.VerticalIndex + 1 : letter.HorizontalIndex + 1
    if (nextLetterIndex > word.Text.length - 1) {
        return letter
    } else if (word.isVertical()) {
        nextLetter = letters.find(l => l.VerticalIndex == nextLetterIndex && l.isPartOfWord(word.Id))
    } else {
        nextLetter = letters.find(l => l.HorizontalIndex == nextLetterIndex && l.isPartOfWord(word.Id))
    }
    return nextLetter
}

function getPreviousLetter(word, letter) {
    var previousLetter
    const nextLetterIndex = word.isVertical() ? letter.VerticalIndex - 1 : letter.HorizontalIndex - 1
    if (nextLetterIndex < 0) {
        return letter
    } else if (word.isVertical()) {
        previousLetter = letters.find(l => l.VerticalIndex == nextLetterIndex && l.isPartOfWord(word.Id))
    } else {
        previousLetter = letters.find(l => l.HorizontalIndex == nextLetterIndex && l.isPartOfWord(word.Id))
    }
    return previousLetter
}