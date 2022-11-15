function degToRad(d) {
    return d * Math.PI/180
}

class Rail {
    constructor(p1, p2, r1, r2) {
        this.p1 = p1
        this.p2 = p2
        this.r1 = r1
        this.r2 = r2
        if (r1) { r1.r2 = this }

        this.length = 

        this.object = new PIXI.Graphics()
        this.object.beginFill(0x101010)
        this.object.drawRect()
    }

    draw() {
        
    }
}

export default Rail
