define(function (require) {
  var d3 = require('d3');

  return function rect() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var width = 10;
    var height = 10;

    var cssClass = 'rect';
    var fillStyle = 'blue';
    var lineWidth = 3;
    var strokeStyle = 'black';
    var globalAlpha = 1;

    function getValue(d, i, val) {
      if (val instanceof Function) {
        return val.call(null, d, i);
      }
      return val;
    }

    function element(selection) {
      selection.each(function (data) {
        var canvas = d3.select(this);
        var context = canvas.node().getContext('2d');
        // var container = canvas.append('custom');

        // canvas.node().addEventListener('click', function (event) {
        //   console.log(event);
        // });

        // Clear Canvas
        context.fillStyle = '#fff';
        context.rect(0, 0, canvas.attr('width'), canvas.attr('height'));
        context.fill();

        data.forEach(function (d, i) {
          d.fillStyle = getValue(d, i, fillStyle);
          d.strokeStyle = getValue(d, i, strokeStyle);
          d.globalAlpha = getValue(d, i, globalAlpha);
          d.lineWidth = getValue(d, i, lineWidth);
          d.width = getValue(d, i, width);
          d.height = getValue(d, i, height);

          context.beginPath();
          context.fillStyle = d.fillStyle;
          context.strokeStyle = d.strokeStyle;
          context.lineWidth = d.lineWidth;
          context.globalAlpha = d.globalAlpha;
          context.rect(x.call(null, d, i), y.call(null, d, i), d.width, d.height);
          context.fill();
          context.closePath();
        });
      });
    }

    // Public API

    /**
     * [x description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.x = function (v) {
      if (!arguments.length) { return x; }
      x = v;
      return element;
    };

    /**
     * [y description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.y = function (v) {
      if (!arguments.length) { return y; }
      y = v;
      return element;
    };

    /**
     * [width description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.width = function (v) {
      if (!arguments.length) { return width; }
      width = v;
      return element;
    };

    /**
     * [height description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.height = function (v) {
      if (!arguments.length) { return height; }
      height = v;
      return element;
    };

    /**
     * [class description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.class = function (v) {
      if (!arguments.length) { return cssClass; }
      cssClass = v;
      return element;
    };

    /**
     * [fillStyle description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.fillStyle = function (v) {
      if (!arguments.length) { return fillStyle; }
      fillStyle = v;
      return element;
    };

    /**
     * [opacity description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.opacity = function (v) {
      if (!arguments.length) { return globalAlpha; }
      globalAlpha = v;
      return element;
    };

    /**
     * [lineWidth description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.lineWidth = function (v) {
      if (!arguments.length) { return lineWidth; }
      lineWidth = v;
      return element;
    };

    /**
     * [strokeStyle description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.strokeStyle = function (v) {
      if (!arguments.length) { return strokeStyle; }
      strokeStyle = v;
      return element;
    };

    return element;
  };
});
