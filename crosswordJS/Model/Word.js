class Word {
    constructor(id, text, direction, description) {
        this.Id = id
        this.Text = text
        this.Direction = direction
        this.Description = description
        this.Solved = false
    }

    isVertical() {
        if (this.Direction == 1) {
            return true
        } else {
            return false
        }
    }
}