import Rail from "./rail.js"
import Car from "./car.js"

screen.addEventListener("mouseup", mouseup)
screen.addEventListener("mousemove", mousemove)
screen.addEventListener("mousedown", mousedown)

let app = new PIXI.Application({

})
documen.body.appendChild(app.view)
let stage = app.stage

let down = new Two.Vector(0, 0)
let up = new Two.Vector(0, 0)

let keydown = false
let mousepos = new Two.Vector(0, 0)

let rails = []
let cars = []

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

    paths = document.querySelectorAll("path")
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

    let newRail = new Rail(
        down.clone(), 
        mousepos,
        rails[0] ? rails[0] : startRail,
        null
    )
    rails.push(newRail)
}

function mouseup(event) {
    keydown = false
    up.copy(mousepos)

    rails[rails.length-1].p2 = up.clone()
}

const targetNode = document.getElementById('two-0');
const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');

            mutation.addedNodes.forEach(element => {
                if (element.dispatchEvent.length > 10) {
                    element.setAttribute("mouseon", "false")
                    element.addEventListener("mouseover", (event) => {
                        element.setAttribute("mouseon", "true")
                    })
                    element.addEventListener("mouseout", (event) => {
                        element.setAttribute("mouseon", "false")
                    })
                }
            })
        }
    }
})

observer.observe(targetNode, config)
