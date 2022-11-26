export default class Cart {
    constructor(pos, rail) {
        this.pos = pos
        this.rail = rail
        
        this.sprite = PIXI.Sprite.from("./src/cart.png")
        this.sprite.width = 15
        this.sprite.height = 10

        this.physicsBody = Matter.Bodies.circle(pos.x, pos.y, 10, {}, 360)
        this.physicsBody.rail = this.rail

        window.app.stage.addChild(this.sprite)

        Matter.Composite.add(window.engine.world, this.physicsBody)
    }

    draw() {
        this.pos.x = this.physicsBody.position.x
        this.pos.y = this.physicsBody.position.y

        this.sprite.position.x = this.pos.x-7.5
        this.sprite.position.y = this.pos.y

        if (this.rail === undefined) {
            if (this.rail.r2 === undefined) {

            }
        }
    }
}