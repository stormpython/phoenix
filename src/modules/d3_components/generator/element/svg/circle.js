define(function (require) {
  var d3 = require('d3');

  return function circle() {
    var color = d3.scale.category10();
    var cx = function (d) { return d.coords.cx; };
    var cy = function (d) { return d.coords.cy; };
    var radius = function (d) { return d.coords.radius || 5; };
    var cssClass = 'circle';
    var fill;
    var stroke;
    var strokeWidth = 0;
    var fillOpacity;
    var strokeOpacity;

    function colorFill(d, i) {
      return color(i);
    }

    function element(selection) {
      selection.each(function (data) {
        var circles = d3.select(this).selectAll('circle')
          .data(data);

        // Exit
        circles.exit().remove();

        // Enter
        circles.enter().append('circle');

        // Update
        circles
          .attr('class', cssClass)
          .attr('fill', fill || colorFill)
          .attr('stroke', stroke || colorFill)
          .attr('stroke-width', strokeWidth)
          .attr('r', radius)
          .attr('cx', cx)
          .attr('cy', cy)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
      });
    }

    // Public API

    /**
     * [cx Defines the cx attribute for the svg:circle element]
     * @param  {[Function|Number]} v [description]
     * @return {[element]}   [description]
     */
    element.cx = function (v) {
      if (!arguments.length) { return cx; }
      cx = d3.functor(v);
      return element;
    };

    /**
     * [cy Defines the cy attribute for the svg:circle element]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.cy = function (v) {
      if (!arguments.length) { return cy; }
      cy = d3.functor(v);
      return element;
    };

    /**
     * [radius description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.radius = function (v) {
      if (!arguments.length) { return radius; }
      radius = d3.functor(v);
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
