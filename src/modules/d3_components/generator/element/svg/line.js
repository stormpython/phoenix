define(function (require) {
  var d3 = require('d3');

  return function line() {
    var color = d3.scale.category10();
    var x1 = function (d) { return d.coords.x1 || 0; };
    var x2 = function (d) { return d.coords.x2 || 0; };
    var y1 = function (d) { return d.coords.y1 || 0; };
    var y2 = function (d) { return d.coords.y2 || 0; };
    var cssClass = 'line';
    var stroke = colorFill;
    var strokeWidth = 2;
    var strokeOpacity = 1;
    var fillOpacity = null;

    function element(selection) {
      selection.each(function (data) {

        var lines = d3.select(this).selectAll('line')
          .data(data);

        // Exit
        lines.exit().remove();

        // Enter
        lines.enter().append('line');

        // Update
        lines
          .attr('class', cssClass)
          .attr('x1', x1)
          .attr('x2', x2)
          .attr('y1', y1)
          .attr('y2', y2)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .style('stroke-opacity', strokeOpacity)
          .style('fill-opacity', fillOpacity);
      });
    }

    function colorFill(d, i) {
      return color(i);
    }

    // Public API
    element.x1 = function (_) {
      if (!arguments.length) return x1;
      x1 = d3.functor(_);
      return element;
    };

    element.x2 = function (_) {
      if (!arguments.length) return x2;
      x2 = d3.functor(_);
      return element;
    };

    element.y1 = function (_) {
      if (!arguments.length) return y1;
      y1 = d3.functor(_);
      return element;
    };

    element.y2 = function (_) {
      if (!arguments.length) return y2;
      y2 = d3.functor(_);
      return element;
    };

    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
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

    element.strokeOpacity = function (_) {
      if (!arguments.length) return strokeOpacity;
      strokeOpacity = _;
      return element;
    };

    element.fillOpacity = function (_) {
      if (!arguments.length) return fillOpacity;
      fillOpacity = _;
      return element;
    };

    return element;
  };
});