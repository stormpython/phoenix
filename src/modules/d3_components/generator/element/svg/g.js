define(function (require) {
  var d3 = require('d3');

  return function g() {
    var cssClass = null;
    var transform = null;

    function element(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('g')
          .data(data);

        // Exit
        g.exit().remove();

        // Enter
        g.enter().append('g');

        // Update
        g
          .attr('class', cssClass)
          .attr('transform', transform);
      });
    }

    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return element;
    };

    return element;
  };
});