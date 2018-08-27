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
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
    update() {
        this.draw();
    }
}

let particles;
const init = () => {
    particles = [];
    for(let i = 0; i < 400; i++ ){
        particles.push(new Particle(canvas.width/2, canvas.height/2, 5, 'red'));
    }
    
};

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height );
    particles.forEach(particle => {
        particle.update();
    });
}

$(() => {
    init();
    animate();
});

