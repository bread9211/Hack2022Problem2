import Rail from "./rail.js"
import Car from "./car.js"

const two = new Two({
    fullscreen : true,
    autostart : true,
}).appendTo(document.body)

two.bind('resize', resize)
two.bind('update', update)

two.renderer.domElement.addEventListener("click", onclick)

let rails = []
let cars = []

function resize() {
    two.scene.position.set(two.width / 2, two.height / 2)
}

function update(frame, dt) {
    
}

function onclick(event) {
    let car = new Car(new Two.Vector(event.clientX, event.clientY), two)
}