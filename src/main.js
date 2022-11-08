import Rail from "./rail.js"
import Car from "./car.js"

const two = new Two({
    fullscreen : true,
    autostart : true,
}).appendTo(document.body)
const screen = two.renderer.domElement

two.bind('resize', resize)
two.bind('update', update)

screen.addEventListener("click", onclick)

let rails = []
let cars = []

function resize() {
    two.scene.position.set(0, 0)
}

function update(frame, dt) {
    
}

function onclick(event) {
    let car = new Car(
        new Two.Vector(
            event.clientX-screen.getBoundingClientRect().left, 
            event.clientY-screen.getBoundingClientRect().top
        ), 
        two
    )
}