function degToRad(d) {
    return d * Math.PI/180
}

class Car {
    constructor(pos, mass, rail, two) {
        this.pos = pos
        this.rot = 0
        this.vel = 0

        this.pe = 0
        this.ke = 0
        this.maxPE = 0
        this.mass = mass

        this.freefall = false
        this.falling = false

        this.rail = rail
        this.railLength = Two.Vector.distanceBetween(this.rail.p1, this.rail.p2)
        this.railTraversed = 0.01

        this.screenElement = new Two.RoundedRectangle(pos.x, pos.y, 15, 10, 3)
        this.screenElement.fill = new Two.Texture("./src/cart.png")
        this.screenElement.stroke = ""

        two.add(this.screenElement)
        this.two = two
    }

    draw(dt) {
        // Potential energy: U = mass * 9.8 * height
        // Kinetic energy: K = 1/2 * mass * velocity^2
        // Velocity from KE: velocity = sqrt( 2K / mass )

        let element = this.screenElement
        dt /= 1000

        if (this.freefall) {

        } else {
            this.pe = this.mass * 9.8 * ((window.innerHeight - this.pos.y) / 10000)
            console.log(this.pe, this.maxPE, dt)
            if (this.maxPE < this.pe) {
                this.maxPE = this.pe
                this.falling = true
            }
            else if (!this.falling) {
                this.ke = this.maxPE
                this.vel = Math.sqrt(2*this.ke / this.mass)
                this.falling = true
            }

            console.log("fdsafsd", this.railTraversed/this.railLength)
            
            // this.vel -= 4.9 * dt**2
            this.vel *= 0.57

            let frameTraversed = Two.Vector.distanceBetween(
                Two.Vector.zero,
                new Two.Vector(
                    (this.railTraversed/this.railLength)*(this.rail.p2.x-this.rail.p1.x),
                    (this.railTraversed/this.railLength)*(this.rail.p2.y-this.rail.p1.y)
                )
            ) / 2
            this.railLength = Two.Vector.distanceBetween(this.rail.p1, this.rail.p2)
            this.railTraversed += frameTraversed

            let currentRail = this.rail

            if (this.railTraversed >= this.railLength) {
                console.log(this.rail.r2)
                currentRail = this.rail.r2
                this.railTraversed = 0

                if (currentRail !== undefined) {
                    console.log("among s")

                    this.pos.copy(
                        currentRail.p2
                    )
                    this.rot = currentRail.screenElement.rotation
                    this.pos.add(
                        Two.Vector.up.clone().multiplyScalar(10).rotate(this.rot)
                    )
                    this.vel = Two.Vector.subtract(this.rail.p1, this.rail.p2).multiplyScalar(this.vel).rotate(-this.rot).x
        
                    this.rail = currentRail

                    console.log("among")
    
                    return
                } else {
                    this.freefall = true

                    return
                }
            }

            this.pos.add(
                (frameTraversed/this.railLength)*(currentRail.p2.x-currentRail.p1.x),
                (frameTraversed/this.railLength)*(currentRail.p2.y-currentRail.p1.y)
            )
            this.rot = this.rail.screenElement.rotation

            this.rail = currentRail
        }

        element.position = this.pos
        element.rotation = this.rot
    }
}

export default Car
