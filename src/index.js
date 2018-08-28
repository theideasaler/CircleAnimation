import './index.scss';
import $ from 'jquery';

let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext('2d');

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
        this.x = this.x + Math.cos(this.radians) * 10;
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
    particles = [];
    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'red'));
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
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        console.log("window size changed");
        init();
    });
});

