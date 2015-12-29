define(function (require) {
  var d3 = require('d3');
  var colorScale = require('src/modules/d3_components/utils/colorScale');

  return function line() {
    var x1 = function (d) { return d.coords.x1 || 0; };
    var x2 = function (d) { return d.coords.x2 || 0; };
    var y1 = function (d) { return d.coords.y1 || 0; };
    var y2 = function (d) { return d.coords.y2 || 0; };
    var cssClass = 'line';
    var stroke;
    var strokeWidth = 2;
    var strokeOpacity = 1;
    var fillOpacity;
    var colorFill = colorScale();

    function element(selection) {
      selection.each(function (data) {

        var lines = d3.select(this).selectAll('line')
          .data(data);

        // Exit
        lines.exit().remove();

        // Enter
        lines.enter().append('line');

        // Update
        lines
          .attr('class', cssClass)
          .attr('x1', x1)
          .attr('x2', x2)
          .attr('y1', y1)
          .attr('y2', y2)
          .attr('stroke', stroke || colorFill)
          .attr('stroke-width', strokeWidth)
          .style('stroke-opacity', strokeOpacity)
          .style('fill-opacity', fillOpacity);
      });
    }

    // Public API

    /**
     * [x1 description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.x1 = function (v) {
      if (!arguments.length) { return x1; }
      x1 = d3.functor(v);
      return element;
    };

    /**
     * [x2 description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.x2 = function (v) {
      if (!arguments.length) { return x2; }
      x2 = d3.functor(v);
      return element;
    };

    /**
     * [y1 description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.y1 = function (v) {
      if (!arguments.length) { return y1; }
      y1 = d3.functor(v);
      return element;
    };

    /**
     * [y2 description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.y2 = function (v) {
      if (!arguments.length) { return y2; }
      y2 = d3.functor(v);
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

    return element;
  };
});
