function degToRad(d) {
    return d * Math.PI/180
}

class Car {
    constructor(pos, mass, two) {
        this.pos = pos
        this.rot = 0
        this.vel = new Two.Vector(0, 0)

        this.pe = 0
        this.ke = 0
        this.maxPE = this.pe
        this.mass = mass

        this.rail
        this.railLength
        this.railTraversed = 0

        this.screenElement = two.makeRectangle(pos.x, pos.y, 15, 10)
        this.two = two
    }

    draw(rail, dt) {
        // Potential energy: U = mass * 9.8 * height
        // Kinetic energy: K = 1/2 * mass * velocity^2
        // Velocity from KE: velocity = sqrt( 2K / mass )

        let element = this.screenElement

        this.rot = rail.screenElement.rotation
        let degAboveHorizontal = (this.rot+90)*-1
        let direction = (new Two.Vector(1, 0)).rotate(degToRad(degAboveHorizontal))

        this.pe = this.mass * 9.8 * this.pos.y
        if (this.maxPE < this.pe) {this.maxPE = this.pe}
        else {
            this.ke = this.maxPE - this.pe
            this.vel = Math.sqrt(2*this.ke / this.mass)
        }
        
        this.vel -= 4.9 * dt**2
        this.vel *= 0.98

        this.pos = this.pos.add(direction.multiplyScalar(this.vel))

        element.position = this.pos
        element.rotation = this.rot
    }
}

export default Car