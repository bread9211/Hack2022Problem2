function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break
        }
    }
}

class Rail {
    constructor(p1, p2, r1, r2, two) {
        this.p1 = p1
        this.p2 = p2
        this.r1 = r1
        this.r2 = r2
        if (r1) { r1.r2 = this }

        let position = new Two.Vector((p1.x+p2.x) / 2, (p1.y+p2.y) / 2)
        this.screenElement = new Two.Rectangle(position.x, position.y, Two.Vector.distanceBetween(p1, p2), 10)
        this.screenElement.rotation = Math.atan((p2.y-p1.y) / (p2.x-p1.x))
        this.two = two

        two.add(this.screenElement)

        setTimeout(this.init, 100)
    }

    init() {
        elem.addEventListener("mouseenter", (event) => {
            console.log("mouseover")
        })
    }

    draw() {
        this.screenElement.position = new Two.Vector((this.p1.x+this.p2.x) / 2, (this.p1.y+this.p2.y) / 2)
        this.screenElement.width = Two.Vector.distanceBetween(this.p1, this.p2)
        this.screenElement.rotation = Math.atan((this.p2.y-this.p1.y) / (this.p2.x-this.p1.x))
    }
}

export default Rail
 