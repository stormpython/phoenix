define(function (require) {
  var d3 = require('d3');

  return function rect() {
    var color = d3.scale.category10();
    var accessor = function (d) { return d.values; };
    var x = function (d) { return d.dx; };
    var y = function (d) { return d.dy; };
    var rx = function (d) { return d.rx || 0; };
    var ry = function (d) { return d.ry || 0; };
    var width = function (d) { return d.width; };
    var height = function (d) { return d.height; };
    var cssClass = 'bar';
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var opacity = 1;

    function element(selection) {
      selection.each(function (data) {
        data = data.map(function (d, i) {
          return accessor.call(this, d, i);
        });

        var bars = d3.select(this).selectAll('rect')
          .data(data);

        bars.exit().remove();

        bars.enter().append('rect');

        bars
          .attr('class', cssClass)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('x', x)
          .attr('y', y)
          .attr('rx', rx)
          .attr('ry', ry)
          .attr('width', width)
          .attr('height', height)
          .style('opacity', opacity);
      });
    }

    function colorFill(d, i) {
      return color(i);
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = d3.functor(_);
      return element;
    };

    element.x = function (_) {
      if (!arguments.length) { return x; }
      x = d3.functor(_);
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) { return y; }
      y = d3.functor(_);
      return element;
    };

    element.rx = function (_) {
      if (!arguments.length) { return rx; }
      rx = d3.functor(_);
      return element;
    };

    element.ry = function (_) {
      if (!arguments.length) { return ry; }
      ry = d3.functor(_);
      return element;
    };

    element.width = function (_) {
      if (!arguments.length) { return width; }
      width = d3.functor(_);
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) { return height; }
      height = d3.functor(_);
      return element;
    };

    element.class= function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return element;
    };

    element.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return element;
    };

    return element;
  };
});
