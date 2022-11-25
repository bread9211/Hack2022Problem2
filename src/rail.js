export default class Rail {
    constructor(p1, p2, r1, r2) {
        this.p1 = p1
        this.p2 = p2
        this.r1 = r1
        this.r2 = r2

        this.sprite = PIXI.Sprite.from("./src/rail.png")
        this.sprite.width = p1.distanceTo(p2)
        this.sprite.height = 10
        this.sprite.anchor.set(0, 0.5)
        this.sprite.interactive = true
        
        this.sprite.railLeft = PIXI.Sprite.from("./src/railleft.png")
        this.sprite.railLeft.width = 5
        this.sprite.railLeft.height = 10
        this.sprite.railLeft.anchor.set(1, 0.5)
        this.sprite.railLeft.interactive = true

        this.sprite.railRight = PIXI.Sprite.from("./src/railright.png")
        this.sprite.railRight.width = 5
        this.sprite.railRight.height = 10
        this.sprite.railRight.anchor.set(0, 0.5)
        this.sprite.railRight.interactive = true

        this.graphics = new PIXI.Graphics()
        this.handle1 = 0
        this.handle2 = 0

        this.initEvents()

        window.app.stage.addChild(this.sprite)
        window.app.stage.addChild(this.sprite.railLeft)
        window.app.stage.addChild(this.sprite.railRight)
        window.app.stage.addChild(this.graphics)
    }

    initEvents() {
        this.sprite.on("mouseover", (event) => {
            this.handle1 = 0.5
            this.handle2 = 0.5

            let eventPos = new PIXI.Vector(event.x, event.y)

            if (this.p1.distanceTo(eventPos) <= 5) {
                this.handle1 = 1
            }

            if (this.p2.distanceTo(eventPos) <= 5) {
                this.handle2 = 1
            }
        })

        this.sprite.on("mouseleave", (event) => {
            this.handle1 = 0
            this.handle2 = 0
        })

        this.sprite.railLeft.on("mouseover", (event) => {
            this.handle1 = 1
        })

        this.sprite.railLeft.on("mouseleave", (event) => {
            this.handle1 = 0
        })

        this.sprite.railRight.on("mouseover", (event) => {
            this.handle2 = 1
        })

        this.sprite.railRight.on("mouseleave", (event) => {
            this.handle2 = 0
        })
    }

    draw() {
        let diff = this.p2.clone().sub(this.p1)
        this.sprite.width = this.p1.distanceTo(this.p2)
        this.sprite.height = 10
        this.sprite.position.x = this.p1.x
        this.sprite.position.y = this.p1.y

        this.sprite.railLeft.position.x = this.p1.x
        this.sprite.railLeft.position.y = this.p1.y

        this.sprite.railRight.position.x = this.p2.x
        this.sprite.railRight.position.y = this.p2.y

        let angle = (Math.atan(diff.y/diff.x) * 180)/Math.PI
        if (Math.sign(diff.x) === -1) {angle += 180}
        this.sprite.angle = angle
        this.sprite.railLeft.angle = angle
        this.sprite.railRight.angle = angle

        this.drawHandles(
            this.handle1,
            this.handle2
        )
    }

    drawHandles(handle1, handle2) {
        this.graphics.clear()

        if (this.r1 === undefined) {
            this.graphics.lineStyle()
            this.graphics.beginFill(0x0000ff, handle1)
            this.graphics.drawCircle(this.p1.x, this.p1.y, 5)
            this.graphics.endFill()
        }

        if (this.r2 === undefined) {
            this.graphics.lineStyle()
            this.graphics.beginFill(0x00ff00, handle2)
            this.graphics.drawCircle(this.p2.x, this.p2.y, 5)
            this.graphics.endFill()
        }
    }
}