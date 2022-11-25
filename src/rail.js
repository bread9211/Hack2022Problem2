class Rail {
    constructor(p1, p2, r1, r2, two) {
        this.p1 = p1
        this.p2 = p2
        this.r1 = r1
        this.r2 = r2
        if (r1) { r1.r2 = this }

        let position = new Two.Vector((p1.x+p2.x) / 2, (p1.y+p2.y) / 2)
        let screenElement = new Two.RoundedRectangle(
            position.x, 
            position.y, 
            Two.Vector.distanceBetween(p1, p2), 
            10, 
            5
        )
        let texture = new Two.Texture("./src/rail.png")
        screenElement.rotation = Math.atan((p2.y-p1.y) / (p2.x-p1.x))
        screenElement.fill = texture
        screenElement.stroke = ""
        this.screenElement = screenElement

        let handle1 = new Two.Circle(p1.x, p1.y, 7)
        let handle2 = new Two.Circle(p2.x, p2.y, 7)
        handle1.fill = "blue"
        handle2.fill = "green"
        handle1.stroke = ""
        handle2.stroke = ""
        handle1.opacity = 0.5
        handle2.opacity = 0.5
        this.handle1 = handle1
        this.handle2 = handle2

        this.mouseOn = false
        this.mouseOnHandle1 = false
        this.mouseOnHandle2 = false

        this.two = two

        this.init()

        two.add(this.screenElement)
        two.add(this.handle1)
        two.add(this.handle2)
    }

    init() {
        this.drawHandles(false, 1)
        this.drawHandles(false, 2)

        if (this.r1) { this.removeHandle(1) }
        if (this.r2) { this.removeHandle(2) }

        function wait(resolve, reject) {
            console.log(this)
            if (this.screenElement.renderer?.elem !== undefined) {
                resolve()
            } else {
                setTimeout(wait.bind(this, resolve, reject), 30)
            }
        }

        new Promise(wait.bind(this)).then(() => {
            this.screenElement.renderer.elem.addEventListener("mouseenter", (event) => {
                this.mouseOn = true 
                console.log("mouseenter")
            })

            this.screenElement.renderer.elem.addEventListener("mouseleave", (event) => {
                this.mouseOn = false
                console.log("mouseleave")
            })

            if (this.handle1) {
                this.handle1.renderer.elem.addEventListener("mouseenter", (event) => {
                    this.mouseOnHandle1 = true

                    window.target = this
                    window.targetType = "r1"

                    console.log("mouseenter handle1")
                })

                this.handle1.renderer.elem.addEventListener("mouseleave", (event) => {
                    this.mouseOnHandle1 = false

                    window.target = false
                    window.targetType = ""

                    console.log("mouseleave handle1")
                })
            }

            if (this.handle2) {
                this.handle2.renderer.elem.addEventListener("mouseenter", (event) => {
                    this.mouseOnHandle2 = true

                    window.target = this
                    window.targetType = "r2"

                    console.log("mouseenter handle2")
                })

                this.handle2.renderer.elem.addEventListener("mouseleave", (event) => {
                    this.mouseOnHandle2 = false

                    window.target = false
                    window.targetType = ""

                    console.log("mouseleave handle2")
                })
            }
        })
    }

    draw() {
        this.screenElement.position = new Two.Vector((this.p1.x+this.p2.x) / 2, (this.p1.y+this.p2.y) / 2)
        this.screenElement.width = Two.Vector.distanceBetween(this.p1, this.p2)+10
        this.screenElement.rotation = Math.atan((this.p2.y-this.p1.y) / (this.p2.x-this.p1.x))

        this.drawHandles()
    }

    drawHandles() {
        if (this.r1) {
            this.removeHandle(1)
        } else {
            this.handle1.position = this.p1
        }
        if (this.r2) {
            this.removeHandle(2)
        } else {
            this.handle2.position = this.p2
        }

        if (this.mouseOn) {
            if (!this.r1) { 
                this.handle1.opacity = 0.5
            }

            if (!this.r2) { 
                this.handle2.opacity = 0.5
            }
        } else {
            if (!this.r1) { 
                this.handle1.opacity = 0
            }

            if (!this.r2) { 
                this.handle2.opacity = 0
            }
        }

        if (this.mouseOnHandle1) {
            this.handle1.opacity = 1
        }

        if (this.mouseOnHandle2) {
            this.handle2.opacity = 1
        }
    }

    removeHandle(handle) {
        this.two.remove(this["handle" + handle])
        this["mouseOn" + "Handle" + handle] = false
        this["handle" + handle] = false
    }
}

export default Rail
 