define(function (require) {
  var d3 = require('d3');
  var layout = require('src/modules/d3_components/layout/path');
  var pathGenerator = require('src/modules/d3_components/generator/element/svg/path');
  var attrs = require('src/modules/d3_components/utils/attrs');

  /**
   * [path description]
   * @return {[type]} [description]
   */
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
    generator.layout = attrs(pathLayout, generator);

    generator.attr = attrs(paths, generator);

    return generator;
  };
});
