define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/utils/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');
  var scaleGenerator = require('src/modules/d3_components/mixed/scale');
  var isNumber = require('src/modules/d3_components/utils/is_number');

  return function axes() {
    var position = 'bottom';
    var tick = {};
    var rotateLabels = {};
    var title = {};
    var size = [0, 1]; // [width, height]
    var axis = d3.svg.axis();
    var rotation = rotate();
    var scale = scaleGenerator();
    var g;
    var text;

    function getTransform(position, size) {
      var width = size[0];
      var height = size[1];

      if (position === 'bottom') { return 'translate(0,' + height + ')'; }
      if (position === 'right') { return 'translate(' + width + ',0)'; }
      return 'translate(0,0)';
    }

    function getAxisClass(position) {
      if (position === 'bottom') { return 'x axis'; }
      if (position === 'left') { return 'y axis'; }
      if (position === 'right') { return 'y2 axis'; }
      if (position === 'top') { return 'x2 axis'; }
    }

    function getScaleRange(position, size, categories) {
      var width = size[0];
      var height = size[1];

      if (position === 'bottom' || position === 'top') { return [0, width]; }
      if (categories) { return [0, height]; }
      if (scale.type() === 'datetime') { return [0, height]; }
      return [height, 0];
    }

    function generator(selection) {
      selection.each(function (data) {
        var scaleRange = getScaleRange(position, size, scale.categories());

        scale.range(scaleRange)(data);

        axis.orient(position)
          .scale(scale)
          .ticks(tick.number || 10)
          .tickValues(tick.values)
          .tickSize(tick.size || 6)
          .innerTickSize(tick.innerTickSize || 6)
          .outerTickSize(tick.outerTickSize || 6)
          .tickPadding(tick.padding || 3)
          .tickFormat(tick.format);

        if (!g) { g = d3.select(this).append('g'); }

        // Attach axis
        g.attr('class', getAxisClass(position))
          .attr('transform', getTransform(position, size))
          .call(axis);

        if (rotateLabels.allow) {
          var axisLength = Math.abs(scale.range()[1] - scale.range()[0]);

          rotation.axisLength(axisLength);
          g.call(builder(rotateLabels, rotation));
        }

        if (!text) { text = g.append('text'); }

        text.attr('class', title.class || 'axis title')
          .attr('x', title.x || 6)
          .attr('y', title.y || 6)
          .attr('dx', title.dx || '')
          .attr('dy', title.dy || '.71em')
          .attr('transform', title.transform || 'translate(0,0)')
          .style('title-anchor', title.anchor || 'end')
          .text(title.text || '');
      });
    }

    // Public API

    /**
     * [scale description]
     * @return {[type]} [description]
     */
    generator.scale = function () {
      return axis.scale();
    };

    /**
     * [type description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.type = scale.type;

    /**
     * [accessor description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.accessor = scale.accessor;

    /**
     * [categories description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.categories = scale.categories;

    /**
     * [sort description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.sort = scale.sort;

    /**
     * [extent description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.extent = scale.extent;

    /**
     * [min description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.min = scale.min;

    /**
     * [max description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.max = scale.max;

    /**
     * [padding description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.padding = scale.padding;

    /**
     * [clamp description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.clamp = scale.clamp;

    /**
     * [utc description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.utc = scale.utc;

    /**
     * [timeInterval description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.timeInterval = scale.timeInterval;

    /**
     * [position description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.position = function (v) {
      var positions = ['bottom', 'left', 'right', 'top'];
      var isValidPosition = positions.indexOf(v) !== -1;

      if (!arguments.length) { return position; }
      position = isValidPosition ? v : position;
      return generator;
    };

    /**
     * [size description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.size = function (v) {
      if (!arguments.length) { return size; }
      size = Array.isArray(v) && v.length === 2 && v.every(isNumber) ? v : size;
      return generator;
    };

    /**
     * [tick description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.tick = function (v) {
      if (!arguments.length) { return tick; }
      tick.number = v.number;
      tick.values = v.values;
      tick.size = v.size;
      tick.padding = v.padding;
      tick.format = v.format;
      tick.innerTickSize = v.innerTickSize;
      tick.outerTickSize = v.outerTickSize;
      return generator;
    };

    /**
     * [rotateLabels description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.rotateLabels = function (v) {
      if (!arguments.length) { return rotateLabels; }
      rotateLabels = typeof v === 'object' ? v : rotateLabels;
      return generator;
    };

    /**
     * [title description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.title = function (v) {
      if (!arguments.length) { return title; }
      title.class = v.class;
      title.x = v.x;
      title.y = v.y;
      title.dx = v.dx;
      title.dy = v.dy;
      title.transform = v.transform;
      title.anchor = v.anchor;
      title.text = v.text;
      return generator;
    };

    return generator;
  };
});
