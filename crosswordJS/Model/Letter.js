class Letter {
    constructor(id, verticalWordId, verticalIndex, horizontalWordId, horizontalIndex, row, column) {
        this.Id = id
        this.VerticalWordId = verticalWordId
        this.VerticalIndex = verticalIndex
        this.HorizontalWordId = horizontalWordId
        this.HorizontalIndex = horizontalIndex
        this.Row = row
        this.Column = column
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