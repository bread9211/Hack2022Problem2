import Two from "./two"

class Car {
    constructor(p1, p2, two) {
        this.p1 = p1
        this.p2 = p2

        this.screenElement = new Two.Rectangle(p1.x, p1,y, 50)
        this.two = two
        two.add(this.screenElement)
    }

    draw() {
        element = this.screenElement
        
    }
}

export {Car}