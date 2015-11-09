define(function (require) {
  var d3 = require('d3');

  return function path() {
    var color = d3.scale.category10();
    var value = function (d) { return d.d; };
    var cssClass = 'path';
    var transform = 'translate(0,0)';
    var fill = 'none';
    var stroke = function (d, i) { return color(i); };
    var strokeWidth = 1;
    var fillOpacity = 1;
    var strokeOpacity = null;

    function element(selection) {
      selection.each(function (data) {
        var path = d3.select(this).selectAll('path')
          .data(data);

        path.exit().remove();

        path.enter().append('path');

        path
          .attr('transform', transform)
          .attr('class', cssClass)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('d', value)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
      });
    }

    // Public API
    element.path = function (_) {
      if (!arguments.length) return value;
      value = d3.functor(_);
      return element;
    };

    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) return fill;
      fill = _;
      return element;
    };

    element.fillOpacity = function (_) {
      if (!arguments.length) return fillOpacity;
      fillOpacity = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) return stroke;
      stroke = d3.functor(_);
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

    return element;
  };
});
