import Rail from "./rail.js"
import Car from "./car.js"

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

let keydown = false
let mousepos = new Two.Vector(0, 0)

let rails = []
let cars = []

let startRail = new Rail(
    new Two.Vector(10, 100),
    new Two.Vector(100, 100),
    null, null,
    two
)

function resize() {
    two.scene.position.set(0, 0)
}

function update(frame, dt) {
    cars.forEach(element => {
        element.draw(dt)
    });

    rails.forEach(element => {
        element.draw()
    });
}

function mousemove(event) {
    mousepos.set(
        event.clientX-screen.getBoundingClientRect().left, 
        event.clientY-screen.getBoundingClientRect().top
    )
}

function mousedown(event) {
    keydown = true
    down.copy(mousepos)

    rails.push(
        new Rail(
            down.clone(), 
            mousepos,
            rails[0] ? rails[0] : startRail,
            null,
            two
        )
    )
}

function mouseup(event) {
    keydown = false
    up.copy(mousepos)

    rails[rails.length-1].p2 = up.clone()
}
