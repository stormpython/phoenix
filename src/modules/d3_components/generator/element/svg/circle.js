define(function (require) {
  var d3 = require('d3');

  return function circle() {
    var color = d3.scale.category10();
    var cx = function (d) { return d.cx; };
    var cy = function (d) { return d.cy; };
    var radius = function (d) { return d.radius || 5; };
    var cssClass = 'circle';
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var opacity = null;

    function element(selection) {
      selection.each(function (data) {
        var circles = d3.select(this).selectAll('circle')
          .data(data);

        // Exit
        circles.exit().remove();

        // Enter
        circles
          .enter().append('circle');

        // Update
        circles
          .attr('class', cssClass)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('r', radius)
          .attr('cx', cx)
          .attr('cy', cy)
          .style('opacity', opacity);
      });
    }

    function colorFill (d, i) {
      return color(i);
    }

    // Public API
    element.cx = function (_) {
      if (!arguments.length) return cx;
      cx = d3.functor(_);
      return element;
    };

    element.cy = function (_) {
      if (!arguments.length) return cy;
      cy = d3.functor(_);
      return element;
    };

    element.radius = function (_) {
      if (!arguments.length) return radius;
      radius = d3.functor(_);
      return element;
    };

    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) return fill;
      fill = _;
      return element;
    };

    element.opacity = function (_) {
      if (!arguments.length) return opacity;
      opacity = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) return stroke;
      stroke = _;
      return element;
    };

    element.strokeWidth = function (_) {
      if (!arguments.length) return strokeWidth;
      strokeWidth = _;
      return element;
    };

    return element;
  };
});
