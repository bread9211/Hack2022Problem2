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
window.physicsBodies = []

let targetRail

let Engine = Matter.Engine,
    Runner = Matter.Runner,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite

let engine = window.engine = Engine.create()
console.log(engine.gravity.y)

let debug = document.getElementById("debug")
let render = Render.create({
    element: debug,
    engine: engine
})

let startCart
let start = false
let playing = false

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

        if (target === undefined) { return }

        newRail[`r${target}`] = createRail(
            newRail[`p${target}`],
            mousepos,
            newRail,
            undefined
        )
    })

    newRail.sprite.railLeft.on("mousedown", (event) => {
        newRail.r1 = createRail(
            newRail.p1,
            mousepos,
            newRail,
            undefined
        )
    })

    newRail.sprite.railRight.on("mousedown", (event) => {
        newRail.r2 = createRail(
            newRail.p2,
            mousepos,
            newRail,
            undefined
        )
    })

    return newRail
}

function startSim() {
    if (startCart instanceof Cart) {
        startCart.delete()
    }

    startCart = new Cart(
        new PIXI.Vector(10, 90),
        rails[0]
    )

    document.getElementById("reset").disabled = false
    document.getElementById("play").disabled = false
    document.getElementById("pause").disabled = false

    start = true
    playing = true
}

function reset() {
    Matter.Body.setPosition(startCart.physicsBody, {x: 10, y: 90})
    Matter.Body.setVelocity(startCart.physicsBody, {x: 0, y: 0})
    Matter.Body.setPosition(startCart.constraintBody, {x: 0, y: 110})
    Matter.Body.setVelocity(startCart.constraintBody, {x: 0, y: 0})

    startCart.pos.x = startCart.physicsBody.position.x
    startCart.pos.y = startCart.physicsBody.position.y

    startCart.sprite.position.x = startCart.pos.x-7.5
    startCart.sprite.position.y = startCart.pos.y

    rails.forEach(element => {
        element.physicsBody.collisionFilter.category = 0x0004
    })
    startCart.rail = rails[0]
}

function play() { playing = true; Runner.run(runner, engine) }
function pause() { playing = false; Runner.stop(runner) }

document.getElementById("start").addEventListener("click", startSim)
document.getElementById("reset").addEventListener("click", reset)
document.getElementById("play").addEventListener("click", play)
document.getElementById("pause").addEventListener("click", pause)

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

    if (start && playing) {
        startCart.draw()
        startCart.physicsBody.friction = parseFloat(document.getElementById("friction").value)
        engine.gravity.y = parseFloat(document.getElementById("friction").value)
    }
})

createRail(
    new PIXI.Vector(5, 100),
    new PIXI.Vector(100, 150),
    undefined,
    undefined
).createPhysics()
targetRail = false

let runner = Runner.create()
Runner.run(runner, engine)
Render.run(render)