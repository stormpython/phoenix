define(function (require) {
  var d3 = require('d3');

  // Creates a brush control and binds it to an <svg></svg>.
  return function brush() {
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
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

    function control(selection) {
      selection.each(function (data, index) {
        var brushG = d3.select(this).selectAll('g.brush')
          .data([data]);

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        if (xScale) brush.x(xScale);
        if (yScale) brush.y(yScale);
        if (extent) brush.extent(extent);
        if (clamp) brush.clamp(clamp);

        brush
          .on('brushstart', brushStartCallback ? brushStart() : null)
          .on('brush', brushCallback ? brushF() : null)
          .on('brushend', brushEndCallback ? brushEnd() : null);

        brushG.exit().remove();
        brushG.enter().append('g')
          .attr('class', 'brush');

        // Update brush
        brushG.attr('opacity', opacity).call(brush);

        if (width) brushG.selectAll('rect').attr('width', width);
        if (height) brushG.selectAll('rect').attr('height', height);

        function brushStart() {
          brushStartCallback.forEach(function (listener) {
            listener.call(brushG, brush, data, index);
          });
        }

        function brushF() {
          brushCallback.forEach(function (listener) {
            listener.call(brushG, brush, data, index);
          });
        }

        function brushEnd() {
          brushEndCallback.forEach(function (listener) {
            listener.call(brushG, brush, data, index);

            // Clear brush
            d3.selectAll('g.brush').call(brush.clear());
          });
        }
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
      if (Array.isArray(_) || _ === null) brushStartCallback = _;
      return control;
    };

    control.brush = function (_) {
      if (!arguments.length) return brushCallback;
      if (typeof _ === 'function') brushCallback.push(_);
      if (Array.isArray(_) || _ === null) brushCallback = _;
      return control;
    };

    control.brushend = function (_) {
      if (!arguments.length) return brushEndCallback;
      if (typeof _ === 'function') brushEndCallback.push(_);
      if (Array.isArray(_) || _ === null) brushEndCallback = _;
      return control;
    };

    return control;
  };
});