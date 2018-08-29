import './index.scss';
import $ from 'jquery';

let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let colorArray = [
    '#133046',
    '#15959F',
    '#F1E4B3',
    '#F4A090',
    '#F26144'
];
let middleX = window.innerWidth / 2;
let middleY = window.innerHeight / 2;
let mouse = {
    x: middleX,
    y: middleY
};
let becomeCircleFlag = false;
window.addEventListener('mousemove', event => {
    
    if(isNaN(mouse.x)) { mouse.x = middleX; }
    if(isNaN(mouse.y)) { mouse.y = middleY; }
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.height = 2 * middleY;
canvas.width = 2 * middleX;

class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.radians = Math.random() * Math.PI *2;
        this.velocity = 0.05;
        this.circleRadius = {
            distanceX: getRange(50, 180),
            distanceY: getRange(50, 180)
        };
        this.lastMousePosition = {
            x: x,
            y: y
        };
    }
    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        // //drag effects
        this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.25;
        this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.25;
        this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.circleRadius.distanceX;
        this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.circleRadius.distanceY;
        this.radians += this.velocity;
        this.draw(lastPoint);
    }
    draw(lastPoint) {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = this.color;
        // c.fill();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };
}

let getRange = (min, max) => min + (max -min) * Math.random();

let particles;
const init = () => {
    middleX = window.innerWidth / 2;
    middleY = window.innerHeight / 2;
    canvas.height = 2 * middleY;
    canvas.width = 2 * middleX;
    particles = [];
    for (let i = 0; i < 120; i++) {
        const randomRadius = getRange(2,8);
        particles.push(new Particle(mouse.x, mouse.y, randomRadius));
    }
    
};

const animate = () => {
    requestAnimationFrame(animate);
    //put a 0.1 transparent layer on the top of previous layer and circle, 
    //so the 10th time the first layer will be totaly transparent
    c.fillStyle = 'rgba(255, 255, 255, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

$(() => {
    init();
    animate();
    $(window).on('resize', () => {
        init();
    });
    let interval;
    $(window).on('mousedown', () => {
        console.log(becomeCircleFlag);
        becomeCircleFlag = true;
        interval = setInterval(() => {
            console.log("mousedown");
        }, 200);
        return false;
    });
    $(window).on('mouseup', () => {
        console.log(becomeCircleFlag);
        becomeCircleFlag = false;
        clearInterval(interval);
        console.log(becomeCircleFlag);
        return false;
    });


});

