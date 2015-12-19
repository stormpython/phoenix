define(function (require) {
  var d3 = require('d3');

  return function rect() {
    var color = d3.scale.category10();
    var x = function (d) { return d.coords.x; };
    var y = function (d) { return d.coords.y; };
    var rx = function (d) { return d.coords.rx || 0; };
    var ry = function (d) { return d.coords.ry || 0; };
    var width = function (d) { return d.coords.width; };
    var height = function (d) { return d.coords.height; };
    var cssClass = 'bar';
    var fill;
    var stroke;
    var strokeWidth = 0;
    var fillOpacity = 1;
    var strokeOpacity;

    function colorFill(d, i) {
      return color(i);
    }

    function element(selection) {
      selection.each(function (data) {
        var bars = d3.select(this).selectAll('rect')
          .data(data);

        bars.exit().remove();

        bars.enter().append('rect');

        bars
          .attr('class', cssClass)
          .attr('fill', fill || colorFill)
          .attr('stroke', stroke || colorFill)
          .attr('stroke-width', strokeWidth)
          .attr('x', x)
          .attr('y', y)
          .attr('rx', rx)
          .attr('ry', ry)
          .attr('width', width)
          .attr('height', height)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
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
     * [rx description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.rx = function (v) {
      if (!arguments.length) { return rx; }
      rx = d3.functor(v);
      return element;
    };

    /**
     * [ry description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.ry = function (v) {
      if (!arguments.length) { return ry; }
      ry = d3.functor(v);
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
     * [class description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.class = function (v) {
      if (!arguments.length) { return cssClass; }
      cssClass = v;
      return element;
    };

    /**
     * [fill description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.fill = function (v) {
      if (!arguments.length) { return fill; }
      fill = v;
      return element;
    };

    /**
     * [fillOpacity description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.fillOpacity = function (v) {
      if (!arguments.length) { return fillOpacity; }
      fillOpacity = v;
      return element;
    };

    /**
     * [stroke description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.stroke = function (v) {
      if (!arguments.length) { return stroke; }
      stroke = v;
      return element;
    };

    /**
     * [strokeWidth description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.strokeWidth = function (v) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = v;
      return element;
    };

    /**
     * [strokeOpacity description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.strokeOpacity = function (v) {
      if (!arguments.length) { return strokeOpacity; }
      strokeOpacity = v;
      return element;
    };

    return element;
  };
});
