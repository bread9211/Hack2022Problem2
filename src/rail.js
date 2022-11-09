class Rail {
    constructor(r1, r2, two) {
        this.p1 = r1
        this.p2 = r2

        if (r1 instanceof Rail) { this.p1 = r1.p2 }
        if (r2 instanceof Rail) { this.p2 = r2.p1 }

        this.screenElement = new Two.Rectangle(p1.x, p1,y, Two.Vector.distanceBetween(p1, p2), 25)
        this.two = two
        two.add(this.screenElement)
    }
}

export default Rail