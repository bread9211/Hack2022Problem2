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
        this.physicsBody.collisionFilter.category = 0x0001
        this.physicsBody.collisionFilter.mask = 0x0002

        this.constraintBody = Matter.Bodies.circle(0, 110, 5, {}, 360)
        this.constraintBody.collisionFilter.category = 0x0001
        this.constraintBody.collisionFilter.mask = 0x0002

        this.constraint = Matter.Constraint.create({
            bodyA : this.physicsBody,
            bodyB : this.constraintBody,
        })

        this.detector = Matter.Detector.create()

        window.app.stage.addChild(this.sprite)

        Matter.Composite.add(window.engine.world, this.physicsBody)
        Matter.Composite.add(window.engine.world, this.constraintBody)
        Matter.Composite.add(window.engine.world, this.constraint)
    }

    draw() {
        this.pos.x = this.physicsBody.position.x
        this.pos.y = this.physicsBody.position.y

        this.sprite.position.x = this.pos.x
        this.sprite.position.y = this.pos.y

        if (this.rail !== undefined) {
            if (this.rail.r2 !== undefined && this.rail.r2?.physicsBody !== undefined) {
                this.rail.r2.physicsBody.collisionFilter.category = 0x0002
                Matter.Detector.setBodies(this.detector, [this.physicsBody, this.rail.r2.physicsBody])

                let collisions = Matter.Detector.collisions(this.detector)

                if (collisions.length > 0) {
                    if (this.rail.r1 !== undefined && this.rail.r1?.physicsBody !== undefined) {
                        this.rail.r1.physicsBody.collisionFilter.category = 0x0004
                    }

                    this.rail = this.rail.r2
                }
            }

            if (this.rail.r1 !== undefined && this.rail.r1?.physicsBody !== undefined) {
                this.rail.r1.physicsBody.collisionFilter.category = 0x0002
                Matter.Detector.setBodies(this.detector, [this.physicsBody, this.rail.r1.physicsBody])

                let collisions = Matter.Detector.collisions(this.detector)

                if (collisions.length > 0) {
                    if (this.rail.r2 !== undefined && this.rail.r2?.physicsBody !== undefined) {
                        this.rail.r2.physicsBody.collisionFilter.category = 0x0004
                    }

                    this.rail = this.rail.r1
                }
            }

            this.rail.physicsBody.collisionFilter.category = 0x0002
            this.sprite.angle = this.rail.sprite.angle
        }
    }

    delete() {
        Matter.Composite.remove(window.engine.world, this.physicsBody)
        window.app.stage.removeChild(this.sprite)
    }
}