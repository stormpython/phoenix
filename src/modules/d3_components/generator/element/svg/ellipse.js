define(function (require) {
  var d3 = require('d3');
  var color = require('src/modules/d3_components/utils/color');

  return function ellipse() {
    var cx = function (d) { return d.coords.cx; };
    var cy = function (d) { return d.coords.cy; };
    var rx = function (d) { return d.coords.rx || 20; };
    var ry = function (d) { return d.coords.ry || 20; };
    var cssClass = 'ellipses';
    var fill;
    var stroke;
    var strokeWidth = 0;
    var fillOpacity = 1;
    var strokeOpacity;
    var colorFill = color();

    function element(selection) {
      selection.each(function (data) {
        var ellipses = d3.select(this).selectAll('ellipse')
          .data(data);

        // Exit
        ellipses.exit().remove();

        // Enter
        ellipses.enter().append('ellipse');

        // Update
        ellipses
          .attr('class', cssClass)
          .attr('fill', fill || colorFill)
          .attr('stroke', stroke || colorFill)
          .attr('stroke-width', strokeWidth)
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('rx', rx)
          .attr('ry', ry)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
      });
    }

    // Public API

    /**
     * [cx description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.cx = function (v) {
      if (!arguments.length) { return cx; }
      cx = d3.functor(v);
      return element;
    };

    /**
     * [cy description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.cy = function (v) {
      if (!arguments.length) { return cy; }
      cy = d3.functor(v);
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
