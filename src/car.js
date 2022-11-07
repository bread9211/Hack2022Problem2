class Car {
    constructor(pos, two) {
        this.pos = pos
        this.rot

        this.screenElement = two.makeRectangle(pos.x, pos.y, 15, 10)
        this.two = two
    }

    draw() {
        element = this.screenElement
    }
}

export default Car