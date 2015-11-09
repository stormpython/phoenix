define(function (require) {
  var d3 = require('d3');

  return function ellipse() {
    var color = d3.scale.category10();
    var cx = function (d) { return d.coords.cx; };
    var cy = function (d) { return d.coords.cy; };
    var rx = function (d) { return d.coords.rx || 20; };
    var ry = function (d) { return d.coords.ry || 20; };
    var cssClass = 'ellipses';
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var fillOpacity = 1;
    var strokeOpacity = null;

    function element(selection) {
      selection.each(function (data) {
        var ellipses = d3.select(this).selectAll('ellipse')
          .data(data);

        // Exit
        ellipses.exit().remove();

        // Enter
        ellipses.enter().append('ellipse');

        // Update
        ellipses
          .attr('class', cssClass)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('rx', rx)
          .attr('ry', ry)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
      });
    }

    function colorFill(d, i) {
      return color(i);
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

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

    element.rx = function (_) {
      if (!arguments.length) return rx;
      rx = d3.functor(_);
      return element;
    };

    element.ry = function (_) {
      if (!arguments.length) return ry;
      ry = d3.functor(_);
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

    element.fillOpacity = function (_) {
      if (!arguments.length) return fillOpacity;
      fillOpacity = _;
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

    return element;
  };
});
