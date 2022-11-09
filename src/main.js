import Rail from "./rail.js"
import Car from "./car.js"
import Two from "./two.js"

const two = new Two({
    fullscreen : true,
    autostart : true,
}).appendTo(document.body)
const screen = two.renderer.domElement

two.bind('resize', resize)
two.bind('update', update)

screen.addEventListener("mouseup", mouseup)
screen.addEventListener("mousemove", mousemove)
screen.addEventListener("mousedown", mousedown)

let down = new Two.Vector(0, 0)
let up = new Two.Vector(0, 0)

let md = false

let rails = []
let cars = []

function resize() {
    two.scene.position.set(0, 0)
}

function update(frame, dt) {
    for (let i = 0; index < cars.length; i++) {
        const car = cars[i];

    }
}

function mousemove(event) {

}

function mousedown(event) {
    md = true
}

function mouseup(event) {
    md = false
}