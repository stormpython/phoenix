define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

  // Creates a brush control and binds it to an <svg></svg>.
  return function brushControl() {
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var fillOpacity = 0.2;
    var strokeOpacity;
    var width;
    var height;
    var xScale;
    var yScale;
    var extent;
    var clamp = false;
    var brush = d3.svg.brush();
    var brushStartCallback = [];
    var brushCallback = [];
    var brushEndCallback = [];

    function brushStart(d, i) {
      _.forEach(brushStartCallback, function (listener) {
        listener.call(null, d, i);
      });
    }

    function brushF(d, i) {
      _.forEach(brushCallback, function (listener) {
        listener.call(null, d, i);
      });
    }

    function brushEnd(d, i) {
      _.forEach(brushEndCallback, function (listener) {
        listener.call(null, d, i);
      });

      d3.selectAll('g.brush').call(brush.clear()); // Clear brush
    }

    function isArrayOrNull(v) {
      return _.isArray(v) || _.isNull(v);
    }

    function control(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        if (xScale) { brush.x(xScale); }
        if (yScale) { brush.y(yScale); }
        if (extent) { brush.extent(extent); }
        if (clamp) { brush.clamp(clamp); }

        brush
          .on('brushstart', brushStartCallback ? brushStart : undefined)
          .on('brush', brushCallback ? brushF : undefined)
          .on('brushend', brushEndCallback ? brushEnd : undefined);

        var brushG = d3.select(this).selectAll('g.brush')
          .data([data]);

        brushG.exit().remove();
        brushG.enter().append('g')
          .attr('class', 'brush');

        // Update brush
        brushG
          .attr('fill-opacity', fillOpacity)
          .attr('stroke-opacity', strokeOpacity)
          .call(brush);

        if (width) { brushG.selectAll('rect').attr('width', width); }
        if (height) { brushG.selectAll('rect').attr('height', height); }
      });
    }

    // Public API

    /**
     * [margin description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.margin = function (v) {
      if (!arguments.length) { return margin; }
      margin.top = _.isUndefined(v.top) ? margin.top : v.top;
      margin.right = _.isUndefined(v.right) ? margin.right : v.right;
      margin.bottom = _.isUndefined(v.bottom) ? margin.bottom : v.bottom;
      margin.left = _.isUndefined(v.left) ? margin.left : v.left;
      return control;
    };

    /**
     * [width description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.width = function (v) {
      if (!arguments.length) { return width; }
      width = v;
      return control;
    };

    /**
     * [height description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.height = function (v) {
      if (!arguments.length) { return height; }
      height = v;
      return control;
    };

    /**
     * [fillOpacity description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.fillOpacity = function (v) {
      if (!arguments.length) { return fillOpacity; }
      fillOpacity = v;
      return control;
    };

    /**
     * [strokeOpacity description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.strokeOpacity = function (v) {
      if (!arguments.length) { return strokeOpacity; }
      strokeOpacity = v;
      return control;
    };

    /**
     * [xScale description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.xScale = function (v) {
      if (!arguments.length) { return xScale; }
      xScale = v;
      return control;
    };

    /**
     * [yScale description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.yScale = function (v) {
      if (!arguments.length) { return yScale; }
      yScale = v;
      return control;
    };

    /**
     * [extent description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.extent = function (v) {
      if (!arguments.length) { return extent; }
      extent = v;
      return control;
    };

    /**
     * [clamp description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.clamp = function (v) {
      if (!arguments.length) { return clamp; }
      clamp = v;
      return control;
    };

    /**
     * [brushstart description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.brushstart = function (v) {
      if (!arguments.length) { return brushStartCallback; }
      if (_.isFunction(v)) { brushStartCallback.push(v); }
      if (isArrayOrNull(v)) { brushStartCallback = v; }
      return control;
    };

    /**
     * [brush description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.brush = function (v) {
      if (!arguments.length) { return brushCallback; }
      if (_.isFunction(v)) { brushCallback.push(v); }
      if (isArrayOrNull(v)) { brushCallback = v; }
      return control;
    };

    /**
     * [brushend description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    control.brushend = function (v) {
      if (!arguments.length) { return brushEndCallback; }
      if (_.isFunction(v)) { brushEndCallback.push(v); }
      if (isArrayOrNull(v)) { brushEndCallback = v; }
      return control;
    };

    return control;
  };
});
