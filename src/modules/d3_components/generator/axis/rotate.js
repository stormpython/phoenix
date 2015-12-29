define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');
  var truncate = require('src/modules/d3_components/generator/axis/truncate');

  return function rotate() {
    var axisLength = 100;
    var measure = 'width';
    var labelPadding = 5;
    var truncateLength = 10;
    var text = {};

    function component(g) {
      g.each(function () {
        var ticks = d3.select(this).selectAll('.tick text');
        var numOfTicks = ticks[0].length;
        var maxTickLabelLength = (axisLength / numOfTicks) - labelPadding;
        var isRotated;

        ticks.each(function () {
          var labelLength = this.getBBox()[measure];
          if (labelLength >= maxTickLabelLength) { isRotated = true; }
        });

        // Rotate and truncate
        if (isRotated) {
          ticks
            .attr('transform', text.transform || 'translate(0,0)rotate(-45)')
            .attr('x', text.x || 0)
            .attr('y', text.y || 6)
            .attr('dx', text.dx || '')
            .attr('dy', text.dy || '.71em')
            .style('text-anchor', text.anchor || 'end');

          // Truncation logic goes here
          ticks.each(function () {
            d3.select(this).call(truncate().maxCharLength(truncateLength));
          });
        }
      });
    }

    // Public API

    /**
     * [axisLength description]
     * @param  {[type]}  v [description]
     * @return {Boolean}   [description]
     */
    component.axisLength = function (v) {
      if (!arguments.length) { return axisLength; }
      axisLength = _.isNumber(v) ? v : axisLength;
      return component;
    };

    /**
     * [measure description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    component.measure = function (v) {
      if (!arguments.length) { return measure; }
      measure = _.isString(v) ? v : measure;
      return component;
    };

    /**
     * [labelPadding description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    component.labelPadding = function (v) {
      if (!arguments.length) { return labelPadding; }
      labelPadding = _.isNumber(v) ? v : labelPadding;
      return component;
    };

    /**
     * [truncateLength description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    component.truncateLength = function (v) {
      if (!arguments.length) { return truncateLength; }
      truncateLength = _.isNumber(v) ? v : truncateLength;
      return component;
    };

    /**
     * [text description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    component.text = function (v) {
      if (!arguments.length) { return text; }
      text.transform = _.isUndefined(v.transform) ? text.transform : v.transform;
      text.x = _.isUndefined(v.x) ? text.x : v.x;
      text.y = _.isUndefined(v.y) ? text.y : v.y;
      text.dx = _.isUndefined(v.dx) ? text.dx : v.dx;
      text.dy = _.isUndefined(v.dy) ? text.dy : v.dy;
      text.anchor = _.isUndefined(v.anchor) ? text.anchor : v.anchor;
      return component;
    };

    return component;
  };
});
