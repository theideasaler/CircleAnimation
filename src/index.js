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
let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});
let middleX = window.innerWidth / 2;
let middleY = window.innerHeight / 2;

canvas.height = 2 * middleY;
canvas.width = 2 * middleX;

class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.radians = Math.random() * Math.PI *2;
        this.velocity = 0.02;
        this.circleRadius = getRange(50, 120);
    }
    update() {
        this.x = middleX + Math.cos(this.radians) * this.circleRadius;
        this.y = middleY + Math.sin(this.radians) * this.circleRadius;
        this.radians += this.velocity;
        this.draw();
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
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
    for (let i = 0; i < 650; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 5));
    }

};

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
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
});

