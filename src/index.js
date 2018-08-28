import './index.scss';
import $ from 'jquery';

let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let middleX = window.innerWidth / 2;
let middleY = window.innerHeight / 2;

canvas.height = 2 * middleY;
canvas.width = 2 * middleX;

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = 0;
        this.velocity = 0.05;
    }
    update() {
        this.x = middleX + Math.cos(this.radians) * 100;
        this.y = middleY + Math.sin(this.radians) * 100;
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

let particles;
const init = () => {
    middleX = window.innerWidth / 2;
    middleY = window.innerHeight / 2;
    canvas.height = 2 * middleY;
    canvas.width = 2 * middleX;
    particles = [];
    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(middleX, middleY, 5, 'red'));
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

