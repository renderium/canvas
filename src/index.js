function noop () {}

var queue = []
var canvas
var prevTime

class Canvas {
  static digest (time) {
    prevTime = prevTime || time
    while ((canvas = queue.shift())) {
      canvas.clear()
      canvas.redraw(canvas, prevTime - time, time)
      canvas.dequeue()
    }
    prevTime = time
  }

  constructor (options) {
    this.renderer = noop
    this.inQueue = false
  }

  render (renderer) {
    this.renderer = renderer
  }

  enqueue () {
    if (this.inQueue) return
    queue.push(this)
    this.inQueue = true
  }

  dequeue () {
    this.inQueue = false
  }

  clear () {}

  redraw (canvas, delta, elapsed) {
    this.renderer(canvas, delta, elapsed)
  }

  arc (options) {}

  circle (options) {}

  image (options) {}

  polygon (options) {}

  polyline (options) {}

  rect (options) {}

  text (options) {}

  group (options) {}
}

export default Canvas
