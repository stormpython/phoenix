define(function (require) {
  var d3 = require('d3');

  /**
   * Creates a brush control and binds it to an <svg></svg>.
   */
  return function brush() {
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var cssClass = 'brush';
    var opacity = 0.2;
    var width = null;
    var height = null;
    var xScale = null;
    var yScale = null;
    var extent = null;
    var clamp = false;
    var brush = d3.svg.brush();
    var brushStartCallback = [];
    var brushCallback = [];
    var brushEndCallback = [];
    var brushG;

    function control(selection) {
      selection.each(function (data, index) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        function brushStart() {
          brushStartCallback.forEach(function (listener) {
            listener.call(this, brush, data, index);
          });
        }

        function brushF() {
          brushCallback.forEach(function (listener) {
            listener.call(this, brush, data, index);
          });
        }

        function brushEnd() {
          brushEndCallback.forEach(function (listener) {
            listener.call(this, brush, data, index);

            // Clear brush
            d3.selectAll('g.' + cssClass)
              .call(brush.clear());
          });
        }

        brush
          .on('brushstart', brushStartCallback ? brushStart : null)
          .on('brush', brushCallback ? brushF : null)
          .on('brushend', brushEndCallback ? brushEnd : null);

        if (xScale) { brush.x(xScale); }
        if (yScale) { brush.y(yScale); }
        if (extent) { brush.extent(extent); }
        if (clamp) { brush.clamp(clamp); }

        if (!brushG) {
          brushG = d3.select(this).append('g');
        }

        // Attach new brush
        brushG.attr('class', cssClass)
          .attr('opacity', opacity)
          .call(brush)
          .selectAll('rect');

        if (width) { brushG.attr('width', width); }
        if (height) { brushG.attr('height', height); }
      });
    }

    // Public API
    control.margin = function (_) {
      if (!arguments.length) return margin;
      margin.top = typeof _.top !== 'undefined' ? _.top : margin.top;
      margin.right = typeof _.right !== 'undefined' ? _.right : margin.right;
      margin.bottom = typeof _.bottom !== 'undefined' ? _.bottom : margin.bottom;
      margin.left = typeof _.left !== 'undefined' ? _.left : margin.left;
      return control;
    };

    control.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return control;
    };

    control.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return control;
    };

    control.opacity = function (_) {
      if (!arguments.length) return opacity;
      opacity = _;
      return control;
    };

    control.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return control;
    };

    control.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return control;
    };

    control.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return control;
    };

    control.extent = function (_) {
      if (!arguments.length) return extent;
      extent = _;
      return control;
    };

    control.clamp = function (_) {
      if (!arguments.length) return clamp;
      clamp = _;
      return control;
    };

    control.brushstart = function (_) {
      if (!arguments.length) return brushStartCallback;
      if (typeof _ === 'function') brushStartCallback.push(_);
      if (Array.isArray(_)) brushStartCallback = _;
      if (_ === null) brushStartCallback = _;
      return control;
    };

    control.brush = function (_) {
      if (!arguments.length) return brushCallback;
      if (typeof _ === 'function') brushCallback.push(_);
      if (Array.isArray(_)) brushCallback = _;
      if (_ === null) brushCallback = _;
      return control;
    };

    control.brushend = function (_) {
      if (!arguments.length) return brushEndCallback;
      if (typeof _ === 'function') brushEndCallback.push(_);
      if (Array.isArray(_)) brushEndCallback = _;
      if (_ === null) brushEndCallback = _;
      return control;
    };

    return control;
  };
});