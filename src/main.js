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
screen.addEventListener("mouseleave", end)

let keydown = false
let mousepos = new Two.Vector(0, 0)

let rails = []
let cars = []

window.target = false
window.targetType = ""

let carDT

let startRail = new Rail(
    new Two.Vector(10, 100),
    new Two.Vector(100, 150),
    undefined, undefined,
    two
)
rails.push(startRail)

let car = new Car(
    new Two.Vector(10, 100), 
    10,
    startRail,
    two
)
setTimeout(() => {
    cars.push(car)
}, 10000)

function resize() {
    two.scene.position.set(0, 0)
}

function update(frame, dt) {
    carDT = dt

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
    if (!window.target) {
        cars.forEach(element => {
            element.draw(carDT)
        })

        return
    }
    keydown = true

    let newRail = new Rail(
        window.target["p" + window.targetType[1]], 
        mousepos,
        window.target,
        undefined,
        two
    )
    console.log(newRail)
    window.target[window.targetType] = newRail
    rails.push(newRail)
    console.log(window.target[window.targetType] === newRail)

    window.target = false
    window.targetType = ""
}

function mouseup(event) {
    if (keydown) {
        rails[rails.length-1].p2 = mousepos.clone()
        
    }

    keydown = false
}

function end(event) {
    if (keydown) {
        rails[rails.length-1].p2 = mousepos.clone()
    }

    keydown = false
}