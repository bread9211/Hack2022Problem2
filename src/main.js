import Cart from "./cart.js"
import Rail from "./rail.js"

let div = document.getElementById("canvas")
let app = window.app = new PIXI.Application({
    autoStart : true,
    background : 0xffffff,
    resizeTo : canvas
})
div.appendChild(app.view);

let mousepos = new PIXI.Vector()

let rails = []

let targetRail

let Engine = Matter.Engine,
    Runner = Matter.Runner,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite

let engine = window.engine = Engine.create()

let debug = document.getElementById("debug")
let render = Render.create({
    element: debug,
    engine: engine
})

function createRail(p1, p2, r1, r2) {
    let newRail = new Rail(p1, p2, r1, r2)
    targetRail = newRail

    rails.push(newRail)

    newRail.sprite.on("mousedown", (event) => {
        let target

        let eventPos = new PIXI.Vector(event.x, event.y)

        if (newRail.p1.distanceTo(eventPos) <= 5) {
            target = "1"
        }

        if (newRail.p2.distanceTo(eventPos) <= 5) {
            target = "2"
        }
        newRail[`r${target}`] = createRail(
            newRail[`p${target}`],
            mousepos,
            newRail,
            undefined
        )
    })

    newRail.sprite.railLeft.on("mousedown", (event) => {
        let target

        let eventPos = new PIXI.Vector(event.x, event.y)

        if (newRail.p1.distanceTo(eventPos) <= 5) {
            target = "1"
        }

        if (newRail.p2.distanceTo(eventPos) <= 5) {
            target = "2"
        }
        console.log(`p${target}`)
        newRail[`r${target}`] = createRail(
            newRail[`p${target}`],
            mousepos,
            newRail,
            undefined
        )
    })

    newRail.sprite.railRight.on("mousedown", (event) => {
        let target

        let eventPos = new PIXI.Vector(event.x, event.y)

        if (newRail.p1.distanceTo(eventPos) <= 5) {
            target = "1"
        }

        if (newRail.p2.distanceTo(eventPos) <= 5) {
            target = "2"
        }

        newRail[`r${target}`] = createRail(
            newRail[`p${target}`],
            mousepos,
            newRail,
            undefined
        )
    })

    return newRail
}

app.view.addEventListener("mousemove", (event) => {
    mousepos.set(event.offsetX, event.offsetY)
})

app.view.addEventListener("mouseup", (event) => {
    targetRail.p2 = mousepos.clone()
    targetRail.createPhysics()
    targetRail = false
})

app.ticker.add((t) => {
    rails.forEach(element => {
        element.draw()
    })

    startCart.draw()
})

createRail(
    new PIXI.Vector(5, 100),
    new PIXI.Vector(100, 110),
    undefined,
    undefined
).createPhysics()

let startCart = new Cart(
    new PIXI.Vector(10, 50),
    rails[0]
)

let runner = Runner.create()
Runner.run(runner, engine)
Render.run(render)