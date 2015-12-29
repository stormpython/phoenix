define(function (require) {
  var d3 = require('d3');
  var colorScale = require('src/modules/d3_components/utils/colorScale');

  return function path() {
    var value = function (d) { return d.d; };
    var cssClass = 'path';
    var transform = 'translate(0,0)';
    var fill = 'none';
    var stroke = colorScale();
    var strokeWidth = 1;
    var fillOpacity = 1;
    var strokeOpacity;

    function element(selection) {
      selection.each(function (data) {
        var paths = d3.select(this).selectAll('path')
          .data(data);

        paths.exit().remove();

        paths.enter().append('path');

        paths
          .attr('transform', transform)
          .attr('class', cssClass)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('d', value)
          .style('fill-opacity', fillOpacity)
          .style('stroke-opacity', strokeOpacity);
      });
    }

    // Public API

    /**
     * [path description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.path = function (v) {
      if (!arguments.length) { return value; }
      value = d3.functor(v);
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
     * [transform description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.transform = function (v) {
      if (!arguments.length) { return transform; }
      transform = v;
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
      stroke = d3.functor(v);
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
