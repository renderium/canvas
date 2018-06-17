(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Canvas = factory());
}(this, (function () { 'use strict';

  function noop () {}

  var queue = [];
  var canvas;
  var prevTime;

  var Canvas = function Canvas (options) {
    this.renderer = noop;
    this.inQueue = false;
  };

  Canvas.digest = function digest (time) {
    prevTime = prevTime || time;
    while ((canvas = queue.shift())) {
      canvas.clear();
      canvas.redraw(canvas, prevTime - time, time);
      canvas.dequeue();
    }
    prevTime = time;
  };

  Canvas.prototype.render = function render (renderer) {
    this.renderer = renderer;
  };

  Canvas.prototype.enqueue = function enqueue () {
    if (this.inQueue) { return }
    queue.push(this);
    this.inQueue = true;
  };

  Canvas.prototype.dequeue = function dequeue () {
    this.inQueue = false;
  };

  Canvas.prototype.clear = function clear () {};

  Canvas.prototype.redraw = function redraw (canvas, delta, elapsed) {
    this.renderer(canvas, delta, elapsed);
  };

  Canvas.prototype.arc = function arc (options) {};

  Canvas.prototype.circle = function circle (options) {};

  Canvas.prototype.image = function image (options) {};

  Canvas.prototype.polygon = function polygon (options) {};

  Canvas.prototype.polyline = function polyline (options) {};

  Canvas.prototype.rect = function rect (options) {};

  Canvas.prototype.text = function text (options) {};

  Canvas.prototype.group = function group (options) {};

  return Canvas;

})));
