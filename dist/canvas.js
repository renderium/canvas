function noop () {}

var pixelRatio = window.devicePixelRatio || 1;
var queue = [];
var canvas;
var prevTime;

class Canvas {
  static digest (time) {
    prevTime = prevTime || time;
    while ((canvas = queue.shift())) {
      canvas.scale();
      canvas.clear();
      canvas.redraw(canvas, prevTime - time, time);
      canvas.dequeue();
    }
    prevTime = time;
  }

  constructor (options) {
    this.el = options.el;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.renderer = noop;
    this.inQueue = false;
    this.width = 0;
    this.height = 0;
    this.el.appendChild(this.canvas);
    this.scale();
  }

  render (renderer) {
    this.renderer = renderer;
  }

  enqueue () {
    if (this.inQueue) return
    queue.push(this);
    this.inQueue = true;
  }

  dequeue () {
    this.inQueue = false;
  }

  clear () {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  }

  scale () {
    var width = this.el.clientWidth;
    var height = this.el.clientHeight;
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.canvas.width = this.width * pixelRatio;
      this.canvas.height = this.height * pixelRatio;
      this.ctx.scale(pixelRatio, pixelRatio);
      this.ctx.translate(0.5, 0.5);
    }
  }

  redraw (canvas, delta, elapsed) {
    this.renderer(canvas, delta, elapsed);
  }

  arc (options) {
    var x = options.x;
    var y = options.y;
    var radius = options.radius;
    var theta = options.theta;
    var length = options.length;
    var stroke = options.stroke;
    var width = options.width || 1;
    var opacity = options.opacity || 1;
    var ctx = this.ctx;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke;
    ctx.globalAlpha = opacity;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, length);
    ctx.stroke();

    ctx.restore();
  }

  circle (options) {}

  image (options) {}

  polygon (options) {}

  polyline (options) {}

  rect (options) {}

  text (options) {}

  group (options) {}
}

export default Canvas;
