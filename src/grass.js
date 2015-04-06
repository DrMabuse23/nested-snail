import {Component, Template} from 'angular2/angular2';
@Component({
  selector: 'grass'
})
@Template({
  url: `templates/grass.html`
})
export class Grass {
  w:number;
  h:number;
  canvas:any;
  context:any;
  stack:array;

  anim() {
    let x = 0;
    let speed = Math.random() * 1;
    let position = Math.random() * this.w - this.w / 2;
    let maxTall = Math.random() * 100 + 300;
    let maxSize = Math.random() * 10;
    let c = function (l, u) {
      return Math.round(Math.random() * (u || 255) + l || 0);
    };
    let color = 'rgb(' + c(60, 10) + ',' + c(201, 50) + ',' + c(120, 50) + ')';
    return function () {
      let deviation = Math.cos(x / 30) * Math.min(x / 40, 50),
        tall = Math.min(x / 5, maxTall),
        size = Math.min(x / 50, maxSize);

      x += speed;
      this.context.save();
      this.context.strokeWidth = 10;
      this.context.translate(this.w / 2 + position, this.h);
      this.context.fillStyle = color;
      this.context.beginPath();
      this.context.lineTo(-size, 0);
      this.context.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
      this.context.quadraticCurveTo(size, -tall / 2, size, 0);
      //this.context.closePath();
      this.context.fill();
      this.context.restore()
    }
  }

  drawer() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.w, this.h);
    this.stack.forEach(function (el) {
      el();
    });
    requestAnimationFrame(() => this.drawer());
  }

  constructor() {
    this.canvas = document.getElementById('grass');
    this.context = this.canvas.getContext('2d');
    this.stack = [];
    this.w = 800;
    this.h = 600;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    for (let x = 0; x < 300; x++) {
      this.stack.push(this.anim().bind(this));
    }
    this.drawer();
  }
}
