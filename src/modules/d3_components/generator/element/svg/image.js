define(function (require) {
  var d3 = require('d3');

  return function image() {
    var x = function (d) { return d.coords.x; };
    var y = function (d) { return d.coords.y; };
    var width = function (d) { return d.coords.width || 10; };
    var height = function (d) { return d.coords.height || 10; };
    var xlink;
    var preserveAspectRatio;
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

    /**
     * [x description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.x = function (v) {
      if (!arguments.length) { return x; }
      x = d3.functor(v);
      return element;
    };

    /**
     * [y description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.y = function (v) {
      if (!arguments.length) { return y; }
      y = d3.functor(v);
      return element;
    };

    /**
     * [width description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.width = function (v) {
      if (!arguments.length) { return width; }
      width = d3.functor(v);
      return element;
    };

    /**
     * [height description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.height = function (v) {
      if (!arguments.length) { return height; }
      height = d3.functor(v);
      return element;
    };

    /**
     * [xlink description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.xlink = function (v) {
      if (!arguments.length) { return xlink; }
      xlink = v;
      return element;
    };

    /**
     * [preserveAspectRatio description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.preserveAspectRatio = function (v) {
      if (!arguments.length) { return preserveAspectRatio; }
      preserveAspectRatio = v;
      return element;
    };

    /**
     * [class description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.class = function (v) {
      if (!arguments.length) { return cssClass; }
      cssClass = v;
      return element;
    };

    return element;
  };
});
