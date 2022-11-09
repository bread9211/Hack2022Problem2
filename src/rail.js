class Rail {
    constructor(p1, p2, r1, r2, two) {
        this.p1 = p1
        this.p2 = p2
        this.r1 = r1
        this.r2 = r2
        r1.r2 = this

        this.screenElement = new Two.Rectangle(p1.x, p1,y, Two.Vector.distanceBetween(p1, p2), 25)
        this.two = two
        two.add(this.screenElement)
    }
}

export default Rail
