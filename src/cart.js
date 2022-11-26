export default class Cart {
    constructor(pos, rail) {
        this.pos = pos
        this.rail = rail
        
        this.sprite = PIXI.Sprite.from("./src/cart.png")
        this.sprite.width = 15
        this.sprite.height = 10
        this.sprite.anchor.set(0.5, 0.5)

        this.physicsBody = Matter.Bodies.circle(pos.x, pos.y, 5, {}, 360)
        this.physicsBody.rail = this.rail

        this.detector = Matter.Detector.create()

        this.constraint = Matter.Constraint.create({
        })

        window.app.stage.addChild(this.sprite)

        Matter.Composite.add(window.engine.world, this.physicsBody)
    }

    draw() {
        this.pos.x = this.physicsBody.position.x
        this.pos.y = this.physicsBody.position.y

        this.sprite.position.x = this.pos.x-7.5
        this.sprite.position.y = this.pos.y

        if (this.rail !== undefined) {
            if (this.rail.r2 !== undefined && this.rail.r2?.physicsBody !== undefined) {
                Matter.Detector.setBodies(this.detector, [this.physicsBody, this.rail.r2.physicsBody])

                let collisions = Matter.Detector.collisions(this.detector)

                if (collisions.length > 0) {
                    this.rail = this.rail.r2
                }
            }

            if (this.rail.r1 !== undefined && this.rail.r1?.physicsBody !== undefined) {
                Matter.Detector.setBodies(this.detector, [this.physicsBody, this.rail.r1.physicsBody])

                let collisions = Matter.Detector.collisions(this.detector)

                if (collisions.length > 0) {
                    this.rail = this.rail.r1
                }
            }

            this.sprite.angle = this.rail.sprite.angle
        }
    }
}