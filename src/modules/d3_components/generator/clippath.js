define(function (require) {
  var d3 = require('d3');

  return function clipPath() {
    var id = uniqueID();
    var transform = 'translate(0,0)';
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('.clip-path')
          .data([data]);

        g.exit().remove();
        g.enter().append('clipPath');
        g.attr('id', id)
          .attr('transform', transform);

        var rect = g.selectAll('rect.clip-path-rect')
          .data([data]);

        rect.exit().remove();
        rect.enter().append('rect').attr('class', 'clip-path-rect');
        rect.attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height);
      });
    }

    function uniqueID() {
      var randomNumber = Math.floor(Math.random() * 100);
      return 'uniqueId_' + randomNumber;
    }

    generator.id = function (_) {
      if (!arguments.length) return id;
      id = _;
      return generator;
    };

    generator.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return generator;
    };

    generator.x = function (_) {
      if (!arguments.length) return x;
      x = _;
      return generator;
    };

    generator.y = function (_) {
      if (!arguments.length) return y;
      y = _;
      return generator;
    };

    generator.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return generator;
    };

    generator.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return generator;
    };

    return generator;
  };
});
