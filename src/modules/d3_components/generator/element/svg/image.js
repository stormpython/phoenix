define(function (require) {
  var d3 = require('d3');

  return function image() {
    var x = function (d) { return d.coords.x; };
    var y = function (d) { return d.coords.y; };
    var width = function (d) { return d.coords.width || 10; };
    var height = function (d) { return d.coords.height || 10; };
    var xlink = null;
    var preserveAspectRatio = null;
    var cssClass = 'image';

    function element(selection) {
      selection.each(function (data) {
        var images = d3.select(this).selectAll('image')
          .data(data);

        // Exit
        images.exit().remove();

        // Enter
        images.enter().append('image');

        // Update
        images
          .attr('class', cssClass)
          .attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height)
          .attr('xlink:href', xlink)
          .attr('preserveAspectRatio', preserveAspectRatio);
      });
    }

    // Public API
    element.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
      return element;
    };

    element.width = function (_) {
      if (!arguments.length) return width;
      width = d3.functor(_);
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) return height;
      height = d3.functor(_);
      return element;
    };

    element.xlink = function (_) {
      if (!arguments.length) return xlink;
      xlink = _;
      return element;
    };

    element.preserveAspectRatio = function (_) {
      if (!arguments.length) return preserveAspectRatio;
      preserveAspectRatio = _;
      return element;
    };

    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    return element;
  };
});
