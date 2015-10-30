define(function (require) {
  var d3 = require('d3');

  return function svg() {
    var cssClass = null;
    var x = null;
    var y = null;
    var width = 0;
    var height = 0;
    var preserveAspectRatio = null;
    var contentScriptType = null;
    var contentStyleType = null;
    var viewBox = null;

    function element(selection) {
      selection.each(function (data) {
        var svg = d3.select(this).selectAll('svg')
          .data(data);

        // Exit
        svg.exit().remove();

        // Enter
        svg.enter().append('svg');

        // Update
        svg
          .attr('class', cssClass)
          .attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height)
          .attr('preserveAspectRatio', preserveAspectRatio)
          .attr('contentScriptType', contentScriptType)
          .attr('contentStyleType', contentStyleType)
          .attr('viewBox', viewBox);
      });
    }

    // Public API
    element.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return element;
    };

    element.x = function (_) {
      if (!arguments.length) return x;
      x = _;
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) return y;
      y = _;
      return element;
    };

    element.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return element;
    };

    element.preserveAspectRatio = function (_) {
      if (!arguments.length) return preserveAspectRatio;
      preserveAspectRatio = _;
      return element;
    };

    element.contentScriptType = function (_) {
      if (!arguments.length) return contentScriptType;
      contentScriptType = _;
      return element;
    };

    element.contentStyleType = function (_) {
      if (!arguments.length) return contentStyleType;
      contentStyleType = _;
      return element;
    };

    element.viewBox = function (_) {
      if (!arguments.length) return viewBox;
      viewBox = _;
      return element;
    };

    return element;
  };
});