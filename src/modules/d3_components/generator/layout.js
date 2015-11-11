define(function (require) {
  var d3 = require('d3');
  var base = require('src/modules/d3_components/layout/base');

  return function g() {
    var type = 'grid';
    var size = [500, 500];
    var layout = base();
    var columns = 0;

    function generator(selection) {
      selection.each(function (data) {
        // Appends divs based on the data array
        layout.type(type).columns(columns).size(size);

        var g = d3.select(this).selectAll('g')
          .data(layout(data));

        g.exit().remove();
        g.enter().append('g');
        g
          .attr('class', 'chart')
          .attr('transform', function (d) {
            return 'translate(' + d.dx + ',' + d.dy + ')';
          });
      });
    }

    // Public API

    // Layout types => 'rows', 'columns', 'grid'
    generator.layout = function (_) {
      if (!arguments.length) return type;
      type = _;
      return generator;
    };

    generator.columns = function (_) {
      if (!arguments.length) return columns;
      columns = _;
      return generator;
    };

    // Parent generator size, [width, height]
    generator.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return generator;
    };

    return generator;
  };
});