const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d')
let hue = 0
canvas1.height = window.innerHeight
canvas1.width = window.innerWidth

window.addEventListener('resize', () => {
    canvas1.height = window.innerHeight
    canvas1.width = window.innerWidth
    // ctx1.fillStyle = 'white';
    // ctx1.fillRect(10, 20, 150, 50)
})
const rect = canvas1.getBoundingClientRect();
const particleArray = []

const mouse = {
    x: 1000,
    y: 1000,

};
const drawCircle = () => {
    console.log("TEST")
    ctx1.fillStyle = 'white';
    ctx1.beginPath();
    ctx1.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
    ctx1.fill()
}

canvas1.addEventListener('click', (event) => {
    mouse.x = event.x
    mouse.y = event.y
    drawCircle()
    for (let index = 0; index < 1000; index++) {
        particleArray.push(new Particle())
    }
})
canvas1.addEventListener('mousemove', (event) => { 
    mouse.x = event.x
    mouse.y = event.y
    //drawCircle()
    for (let index = 0; index < 20; index++) {
        particleArray.push(new Particle())
    }
})

class Particle {
    constructor() {
        this.x = mouse.x,
        this.y = mouse.y,
        this.size = Math.random() * 15 + 1,
        this.speedX = Math.random() * 6 - 3,
        this.speedY = Math.random() * 6 - 3
        this.color =  'hsl('+ hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        //if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx1.fillStyle = this.color
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx1.fill()
    }
}



// const init = () => {
//     for (let i = 0; i < 1000; i++) {
//         particleArray.push(new Particle())
//     }
// }
// init();
// console.log(particleArray)

const handleParticles = () => {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1)
            i--;
            console.log('length',particleArray.length)
        }
    }
}

const animate = () => {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    // ctx1.fillStyle ='black'
    // ctx1.fillRect = (0, 0, canvas1.width, canvas1.height )
    // ctx1.fillStyle ='black'
    handleParticles()
    hue++
    requestAnimationFrame(animate)
}
animate()