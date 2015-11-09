define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_components/layout/points');
  var circle = require('src/modules/d3_components/generator/element/svg/circle');

  return function points() {
    var color = d3.scale.category10();
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var radius = d3.functor(5);
    var cssClass = 'points';
    var fill = colorFill;
    var fillOpacity = null;
    var stroke = colorFill;
    var strokeWidth = 0;
    var strokeOpacity = null;
    var scatterLayout = layout();
    var circles = circle();

    function generator(selection) {
      selection.each(function (data) {
        scatterLayout.x(x).y(y)
          .radius(radius)
          .xScale(xScale)
          .yScale(yScale);

        circles.class(cssClass)
          .fill(fill)
          .fillOpacity(fillOpacity)
          .stroke(stroke)
          .strokeWidth(strokeWidth)
          .strokeOpacity(strokeOpacity);

        var g = d3.select(this).selectAll('.points-group')
          .data([scatterLayout(data)]);

        g.exit().remove();
        g.enter().append('g');
        g.attr('class', 'points-group').call(circles);
      });
    }

    function colorFill (d, i) { return color(i); }

    // Public API
    generator.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return generator;
    };

    generator.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
      return generator;
    };

    generator.radius = function (_) {
      if (!arguments.length) return radius;
      radius = d3.functor(_);
      return generator;
    };

    generator.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = typeof _ === 'function' ? _ : xScale;
      return generator;
    };

    generator.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = typeof _ === 'function' ? _ : yScale;
      return generator;
    };

    generator.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return generator;
    };

    generator.fill = function (_) {
      if (!arguments.length) return fill;
      fill = _;
      return generator;
    };

    generator.fillOpacity = function (_) {
      if (!arguments.length) return fillOpacity;
      fillOpacity = _;
      return generator;
    };

    generator.stroke = function (_) {
      if (!arguments.length) return stroke;
      stroke = _;
      return generator;
    };

    generator.strokeWidth = function (_) {
      if (!arguments.length) return strokeWidth;
      strokeWidth = _;
      return generator;
    };

    generator.strokeOpacity = function (_) {
      if (!arguments.length) return strokeOpacity;
      strokeOpacity = _;
      return generator;
    };

    return generator;
  };
});
