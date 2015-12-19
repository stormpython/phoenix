define(function (require) {
  var d3 = require('d3');
  var vertical = require('src/modules/d3vcomponents/layout/bars/vertical');
  var horizontal = require('src/modules/d3vcomponents/layout/bars/horizontal');
  var rect = require('src/modules/d3vcomponents/generator/element/svg/rect');

  return function bars() {
    var rects = rect();
    var layout = vertical();

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('g.bar-layers')
          .data(layout(data));

        g.exit().remove();
        g.enter().append('g').attr('class', 'bar-layers');
        g.call(rects);
      });
    }

    // Public API
    // TODO: Figure out a way to refactor this so that orientation does not need to be specified first.
    generator.orientation = function (v) {
      var orientation = { vertical: vertical(), horizontal: horizontal() };

      if (!arguments.length) { return orientation; }
      layout = typeof v === 'string' ? orientation[v] : layout;
      return generator;
    };

    generator.x = layout.x;

    generator.y = layout.y;

    generator.xScale = layout.xScale;

    generator.yScale = layout.yScale;

    generator.rx = layout.rx;

    generator.ry = layout.ry;

    generator.group = layout.group;

    generator.groupPadding = layout.groupPadding;

    generator.timeInterval = layout.timeInterval;

    generator.timePadding = layout.timePadding;

    generator.class = rects.class;

    generator.fill = rects.fill;

    generator.fillOpacity = rects.fillOpacity;

    generator.stroke = rects.stroke;

    generator.strokeWidth = rects.strokeWidth;

    return generator;
  };
});
