'use strict';

var Canvas = function Canvas (options) {};

Canvas.digest = function digest (time) {};

Canvas.prototype.render = function render (renderer) {};

Canvas.prototype.enqueue = function enqueue () {};

Canvas.prototype.dequeue = function dequeue () {};

Canvas.prototype.clear = function clear () {};

Canvas.prototype.redraw = function redraw (canvas, delta, elapsed) {};

Canvas.prototype.arc = function arc (options) {};

Canvas.prototype.circle = function circle (options) {};

Canvas.prototype.image = function image (options) {};

Canvas.prototype.polygon = function polygon (options) {};

Canvas.prototype.polyline = function polyline (options) {};

Canvas.prototype.rect = function rect (options) {};

Canvas.prototype.text = function text (options) {};

Canvas.prototype.group = function group (options) {};

module.exports = Canvas;
