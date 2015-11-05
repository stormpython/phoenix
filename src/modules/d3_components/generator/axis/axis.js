define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');
  var scaleGenerator = require('src/modules/d3_components/mixed/scale');

  return function axes() {
    var type = null;
    var accessor = null;
    var categories = null;
    var extent = false;
    var min = null;
    var max = null;
    var padding = 0.1;
    var clamp = false;
    var utc = false;
    var timeInterval = null;
    var position = 'bottom';
    var tick = {};
    var rotateLabels = {};
    var title = {};
    var size = [0, 1]; // [width, height]
    var axis = d3.svg.axis();
    var rotation = rotate();
    var g;
    var text;

    function generator(selection) {
      selection.each(function (data) {
        var scaleRange = getScaleRange(position, size, categories);

        var scale = scaleGenerator()
          .type(type)
          .accessor(accessor)
          .categories(categories)
          .extent(extent)
          .min(min)
          .max(max)
          .padding(padding)
          .clamp(clamp)
          .utc(utc)
          .timeInterval(timeInterval)
          .range(scaleRange)(data);

        axis.orient(position)
          .scale(scale)
          .ticks(tick.number)
          .tickValues(tick.values)
          .tickSize(tick.size)
          .innerTickSize(tick.innerTickSize)
          .outerTickSize(tick.outerTickSize)
          .tickPadding(tick.padding)
          .tickFormat(tick.format);

        if (!g) g = d3.select(this).append('g');

        // Attach axis
        g.attr('class', getAxisClass(position))
          .attr('transform', getTransform(position, size))
          .call(axis);

        if (rotateLabels.allow) {
          var axisLength = Math.abs(scale.range()[1] - scale.range()[0]);

          rotation.axisLength(axisLength);
          g.call(builder(rotateLabels, rotation));
        }

        if (!text) text = g.append('text');

        text.attr('class', title.class)
          .attr('x', title.x)
          .attr('y', title.y)
          .attr('dx', title.dx)
          .attr('dy', title.dy)
          .attr('transform', title.transform)
          .style('title-anchor', title.anchor)
          .text(title.text);
      });
    }

    function getTransform(position, size) {
      var width = size[0];
      var height = size[1];

      if (position === 'bottom') return 'translate(0,' + height + ')';
      if (position === 'right') return 'translate(' + width + ',0)';
      return 'translate(0,0)';
    }

    function getAxisClass(position) {
      if (position === 'bottom') return 'x axis';
      if (position === 'left') return 'y axis';
      if (position === 'right') return 'y2 axis';
      if (position === 'top') return 'x2 axis';
    }

    function getScaleRange(position, size, categories) {
      var width = size[0];
      var height = size[1];

      if (position === 'bottom' || position === 'top') return [0, width];
      if (categories) return [0, height];
      if (type === 'datetime') return [0, height];
      return [height, 0]
    }

    // Public API
    generator.scale = function () {
      return axis.scale();
    };

    generator.type = function (_) {
      if (!arguments.length) return type;
      type = _;
      return generator;
    };

    generator.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return generator;
    };

    generator.categories = function (_) {
      if (!arguments.length) return categories;
      categories = _;
      return generator;
    };

    generator.extent = function (_) {
      if (!arguments.length) return extent;
      extent = _;
      return generator;
    };

    generator.min = function (_) {
      if (!arguments.length) return min;
      min = _;
      return generator;
    };

    generator.max = function (_) {
      if (!arguments.length) return max;
      max = _;
      return generator;
    };

    generator.padding = function (_) {
      if (!arguments.length) return padding;
      padding = _;
      return generator;
    };

    generator.clamp = function (_) {
      if (!arguments.length) return clamp;
      clamp = _;
      return generator;
    };

    generator.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = _;
      return generator;
    };

    generator.utc = function (_) {
      if (!arguments.length) return utc;
      utc = _;
      return generator;
    };

    generator.position = function (_) {
      var positions = ['bottom', 'left', 'right', 'top'];
      var isValidPosition = positions.indexOf(_) !== -1;

      if (!arguments.length) return position;
      position = isValidPosition ? _ : position;
      return generator;
    };

    generator.size = function (_) {
      function isNumber(val) {
        return typeof val === 'number';
      }

      if (!arguments.length) return size;
      size = Array.isArray(_) && _.length === 2 && _.every(isNumber) ? _ : size;
      return generator;
    };

    generator.tick = function (_) {
      if (!arguments.length) return tick;
      tick.number = typeof _.number !== 'undefined' ? _.number : 10;
      tick.values = typeof _.values !== 'undefined' ? _.values : null;
      tick.size = typeof _.size !== 'undefined' ? _.size : 6;
      tick.padding = typeof _.padding !== 'undefined' ? _.padding : 3;
      tick.format = typeof _.format !== 'undefined' ? _.format : null;
      tick.innerTickSize = typeof _.innerTickSize !== 'undefined' ? _.innerTickSize : 6;
      tick.outerTickSize = typeof _.outerTickSize !== 'undefined' ? _.outerTickSize : 6;
      return generator;
    };

    generator.rotateLabels = function (_) {
      if (!arguments.length) return rotateLabels;
      rotateLabels = typeof _ !== 'object' ? rotateLabels : _;
      return generator;
    };

    generator.title = function (_) {
      if (!arguments.length) return title;
      title.class = typeof _.class !== 'undefined' ? _.class : 'axis title';
      title.x = typeof _.x !== 'undefined' ? _.x : 6;
      title.y = typeof _.y !== 'undefined' ? _.y : 6;
      title.dx = typeof _.dx !== 'undefined' ? _.dx : '';
      title.dy = typeof _.dy !== 'undefined' ? _.dy : '.71em';
      title.transform = typeof _.transform !== 'undefined' ? _.transform : 'translate(0,0)';
      title.anchor = typeof _.anchor !== 'undefined' ? _.anchor : 'end';
      title.text = typeof _.text !== 'undefined' ? _.text : '';
      return generator;
    };

    return generator;
  };
});
