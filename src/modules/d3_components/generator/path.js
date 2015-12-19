define(function (require) {
  var d3 = require('d3');
  var layout = require('src/modules/d3_components/layout/path');
  var pathGenerator = require('src/modules/d3_components/generator/element/svg/path');

  return function path() {
    var pathLayout = layout();
    var paths = pathGenerator();

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('g.path-layers')
          .data(pathLayout(data));

        g.exit().remove();
        g.enter().append('g').attr('class', 'path-layers');
        g.call(paths);
      });
    }

    // Public API
    generator.x = pathLayout.x;

    generator.y = pathLayout.y;

    generator.label = pathLayout.label;

    generator.type = pathLayout.type;

    generator.xScale = pathLayout.xScale;

    generator.yScale = pathLayout.yScale;

    generator.offset = pathLayout.offset;

    generator.interpolate = pathLayout.interpolate;

    generator.tension = pathLayout.tension;

    generator.defined = pathLayout.defined;

    generator.class = pathGenerator.class;

    generator.transform = pathGenerator.transform;

    generator.fill = pathGenerator.fill;

    generator.fillOpacity = pathGenerator.fillOpacity;

    generator.stroke = pathGenerator.stroke;

    generator.strokeWidth = pathGenerator.strokeWidth;

    generator.strokeOpacity = pathGenerator.strokeOpacity;

    return generator;
  };
});
