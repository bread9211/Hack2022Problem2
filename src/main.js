import Two from "./two"
import Rail from "./rail"
import Car from "./car"

const screen = document.getElementById("screen")

const two = new Two({
    fullscreen : true,
    autoStart : true,
    domElement : screen,
})

two.bind('resize', resize)
two.bind('update', update)



let rails = {}
let car = {}

function resize() {
    two.scene.position.set(two.width / 2, two.height / 2)
}

function update(frame, dt) {
    
}