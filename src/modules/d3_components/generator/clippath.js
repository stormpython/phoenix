define(function (require) {
  var d3 = require('d3');

  return function clipPath() {
    var transform = 'translate(0,0)';
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;
    var id;

    function uniqueID() {
      var randomNumber = Math.floor(Math.random() * 100);
      return 'uniqueIdv' + randomNumber;
    }

    function generator(selection) {
      selection.each(function (data) {
        var g = d3.select(this).selectAll('.clip-path')
          .data([data]);

        g.exit().remove();
        g.enter().append('clipPath');
        g.attr('id', id || uniqueID())
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

    // Public API

    /**
     * [id description]
     * @param  {*} v [description]
     * @return {generator}   [description]
     */
    generator.id = function (v) {
      if (!arguments.length) { return id; }
      id = v;
      return generator;
    };

    /**
     * [transform description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.transform = function (v) {
      if (!arguments.length) { return transform; }
      transform = v;
      return generator;
    };

    /**
     * [x description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.x = function (v) {
      if (!arguments.length) { return x; }
      x = v;
      return generator;
    };

    /**
     * [y description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.y = function (v) {
      if (!arguments.length) { return y; }
      y = v;
      return generator;
    };

    /**
     * [width description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.width = function (v) {
      if (!arguments.length) { return width; }
      width = v;
      return generator;
    };

    /**
     * [height description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.height = function (v) {
      if (!arguments.length) { return height; }
      height = v;
      return generator;
    };

    return generator;
  };
});
