define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');
  var builder = require('src/modules/d3_components/utils/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');
  var scaleGenerator = require('src/modules/d3_components/mixed/scale');

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
    generator.type = function (v) {
      if (!arguments.length) { return scale.type(); }
      scale.type(v);
      return generator;
    };

    /**
     * [accessor description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.accessor = function (v) {
      if (!arguments.length) { return scale.accessor(); }
      scale.accessor(v);
      return generator;
    };

    /**
     * [categories description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.categories = function (v) {
      if (!arguments.length) { return scale.categories(); }
      scale.categories(v);
      return generator;
    };

    /**
     * [sort description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.sort = function (v) {
      if (!arguments.length) { return scale.sort(); }
      scale.sort(v);
      return generator;
    };

    /**
     * [extent description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.extent = function (v) {
      if (!arguments.length) { return scale.extent(); }
      scale.extent(v);
      return generator;
    };

    /**
     * [min description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.min = function (v) {
      if (!arguments.length) { return scale.min(); }
      scale.min(v);
      return generator;
    };

    /**
     * [max description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.max = function (v) {
      if (!arguments.length) { return scale.max(); }
      scale.max(v);
      return generator;
    };

    /**
     * [padding description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.padding = function (v) {
      if (!arguments.length) { return scale.padding(); }
      scale.padding(v);
      return generator;
    };

    /**
     * [clamp description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.clamp = function (v) {
      if (!arguments.length) { return scale.clamp(); }
      scale.clamp(v);
      return generator;
    };

    /**
     * [utc description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.utc = function (v) {
      if (!arguments.length) { return scale.utc(); }
      scale.utc(v);
      return generator;
    };

    /**
     * [timeInterval description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.timeInterval = function (v) {
      if (!arguments.length) { return scale.timeInterval(); }
      scale.timeInterval(v);
      return generator;
    };

    /**
     * [position description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    generator.position = function (v) {
      var positions, isValidPosition;

      if (!arguments.length) { return position; }

      positions = ['bottom', 'left', 'right', 'top'];
      isValidPosition = _.includes(positions, v);
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
      size = (_.isArray(v) && _.size(v) === 2 && _.all(v, _.isNumber)) ? v : size;
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
      rotateLabels = _.isPlainObject(v) ? v : rotateLabels;
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
