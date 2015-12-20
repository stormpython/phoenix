define(function (require) {
  var d3 = require('d3');
  var layout = require('src/modules/d3_components/layout/points');
  var circle = require('src/modules/d3_components/generator/element/svg/circle');
  var attrs = require('src/modules/d3_components/utils/attrs');

  /**
   * [points description]
   * @return {[type]} [description]
   */
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
    generator.layout = attrs(scatterLayout, generator);

    generator.attr = attrs(circles, generator);

    return generator;
  };
});
