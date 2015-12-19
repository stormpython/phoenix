define(function (require) {
  var d3 = require('d3');
  var layout = require('src/modules/d3_components/layout/points');
  var circle = require('src/modules/d3_components/generator/element/svg/circle');

  return function points() {
    var scatterLayout = layout();
    var circles = circle();

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('g.points-group')
          .data([scatterLayout(data)]);

        g.exit().remove();
        g.enter().append('g').attr('class', 'points-group');
        g.call(circles);
      });
    }

    // Public API
    generator.x = scatterLayout.x;

    generator.y = scatterLayout.y;

    generator.radius = scatterLayout.radius;

    generator.xScale = scatterLayout.xScale;

    generator.yScale = scatterLayout.yScale;

    generator.class = circles.class;

    generator.fill = circles.fill;

    generator.fillOpacity = circles.fillOpacity;

    generator.stroke = circles.stroke;

    generator.strokeWidth = circles.strokeWidth;

    generator.strokeOpacity = circles.strokeOpacity;

    return generator;
  };
});
