console.log("Linked correctly");
document.addEventListener("DOMContentLoaded", function() {
     // Velocity = 3 m/s
    console.log("Content loaded")
    const obj = document.getElementById("canvas");
    var c = document.querySelector("#canvas");
    var ctx = c.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,200,150);
    var degree = -1;
    ctx.rotate(degree * (Math.PI / 180));
    document.querySelector("#inputs").addEventListener("submit", function(event) {
        console.log("form submitted");
        // updating Canvas
        
        
        // Defining variables
        var cart = obj.getBoundingClientRect();
        var i = 0;
        var temp = i;
        var speed;
        console.log(cart.top, cart.left)
        var changeTop = Number(cart.top) + 30;
        var changeLeft = Number(cart.left) - 10;
        const height = 175;
        var g = document.querySelector("#gravity").value;
        if (g == "") {
            g = 9.8;
        }
        var mass = document.querySelector("#mass").value;
        if (mass == "") {
            mass = 1;   
        }
        var v = document.querySelector("#velocity").value;
        if (v == "") {
            v = 3;
        }
        console.log("mass: ", mass)
        const KE = 0.5 * mass * 3 * 3; // Kinetic Energy = 1/2 * mass * velocity^2 -> velocity = 3
        const GPE = mass * g * height; // Gravitational Potential Energy = mass * gravity * height;
        console.log("GPE: ", GPE, " KE: ", KE)
        const total = KE + GPE; // total energy = kinetic energy + gravitational potential energy
        console.log("Here")
        // hard refresh, i dont think the cache files updated
        
        // Changing position of cart
        async function demo() {
            while(i < 40) {
                obj.style.setProperty("top", changeTop + "px");
                obj.style.setProperty("left", changeLeft + "px");
                speed = 20000 / total; // inverse relationship between speed and total energy
                changeTop = changeTop + 10;
                changeLeft = changeLeft + 3 + 0.1*i;
                ctx.rotate(degree * Math.PI / 180);
                degree = degree - 1;
                // egree = degree- 10;
                await new Promise(res => {setTimeout(res, speed); }); // cahnge milliseconds based on the mass and gravity
                i++;
            }
            degree = 1;
        }
        demo();
        
        event.preventDefault(); 
    })
    document.querySelector("#restart").addEventListener("click", function() {
        obj.style.setProperty("top", "220px");
        obj.style.setProperty("left", "365px");
    })
    

})