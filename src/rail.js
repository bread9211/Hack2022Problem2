import Two from "./two"

class Rail {
    constructor(p1, p2, two) {
        this.p1 = p1
        this.p2 = p2

        this.screenElement = new Two.Rectangle(p1.x, p1,y, Two.Vector.distanceBetween(p1, p2), 25)
        this.two = two
        two.add(this.screenElement)
    }
}

export {Rail}