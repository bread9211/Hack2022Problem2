import * as PIXI from "./pixi.js"

let app = new PIXI.Application()
let stage = app.stage

document.appendChild(app.view)

class Rail {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2

        let xdiff = this.x2-this.x1
        let ydiff = this.y2-this.y1
        this.length = Math.sqrt((xdiff)^2 + (ydiff)^2)
        this.rotation = Math.atan(xdiff/ydiff)+90

        let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE) // placeholder image
        sprite.width = this.length
        sprite.height = 10
        sprite.angle = this.rotation
        sprite.tint = 0x555555
        stage.addChild(sprite)
        this.sprite = sprite
    }

    draw() {
        let xdiff = this.x2-this.x1
        let ydiff = this.y2-this.y1
        this.length = Math.sqrt((xdiff)^2 + (ydiff)^2)
        this.rotation = Math.atan(xdiff/ydiff)+90
        this.sprite.x = this.x1-this.length/2
        this.sprite.y = this.y1-5
        this.sprite.angle = this.rotation
    }
}