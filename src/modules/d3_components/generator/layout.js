define(function (require) {
  var d3 = require('d3');
  var base = require('src/modules/d3_components/layout/base');

  return function chartLayout() {
    var layout = base();

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('g.chart')
          .data(layout(data));

        g.exit().remove();
        g.enter().append('g').attr('class', 'chart');
        g.attr('transform', function (d) {
          return 'translate(' + d.dx + ',' + d.dy + ')';
        });
      });
    }

    // Public API

    generator.type = layout.type;

    generator.columns = layout.columns;

    generator.size = layout.size;

    return generator;
  };
});
