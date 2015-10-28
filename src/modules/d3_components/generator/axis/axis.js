define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');
  var scaleGenerator = require('src/modules/d3_components/mixed/scale');
  var valuator = require('src/modules/d3_components/helpers/valuator');

  return function axes() {
    var type = null;
    var accessor = null;
    var categories = [];
    var min = null;
    var max = null;
    var padding = 0.1;
    var clamp = false;
    var utc = false;
    var timeInterval = null;
    var position = 'bottom'; // `top`, `left`, `right`, `bottom`
    var size = [0, 1]; // [width, height]
    var tick = {};
    var rotateLabels = {};
    var title = {};
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
          .min(min)
          .max(max)
          .padding(padding)
          .clamp(clamp)
          .utc(utc)
          .timeInterval(timeInterval)
          .range(scaleRange)(data);

        axis.orient(position)
          .scale(scale)
          .ticks(tick.number || 10)
          .tickValues(tick.values || null)
          .tickSize(tick.size || 6)
          .innerTickSize(tick.innerTickSize || 6)
          .outerTickSize(tick.outerTickSize || 6)
          .tickPadding(tick.padding || 3)
          .tickFormat(tick.format || null);

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
      if (!type && categories) return [0, height];
      if (type === 'datetime') return [0, height];
      return [height, 0]
    }

    // Public API
    generator.scale = function (_) {
      if (!arguments.length) return axis.scale();
      return generator;
    };

    generator.type = function (_) {
      if (!arguments.length) return type;
      type = _;
      return generator;
    };

    generator.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return generator;
    };

    generator.categories = function (_) {
      if (!arguments.length) return categories;
      categories = Array.isArray(_) ? _ : categories;
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
      if (!arguments.length) return size;
      size = _;
      return generator;
    };

    generator.tick = function (_) {
      if (!arguments.length) return tick;
      tick.number = typeof _.number !== 'undefined' ? _.number : tick.number;
      tick.values = typeof _.values !== 'undefined' ? _.values : tick.values;
      tick.size = typeof _.size !== 'undefined' ? _.size : tick.size;
      tick.padding = typeof _.padding !== 'undefined' ? _.padding : tick.padding;
      tick.format = typeof _.format !== 'undefined' ? _.format : tick.format;
      tick.innerTickSize = typeof _.innerTickSize !== 'undefined' ? _.innerTickSize : tick.innerTickSize;
      tick.outerTickSize = typeof _.outerTickSize !== 'undefined' ? _.outerTickSize : tick.outerTickSize;
      return generator;
    };

    generator.rotateLabels = function (_) {
      if (!arguments.length) return rotateLabels;
      rotateLabels = typeof _ !== 'object' ? rotateLabels : _;
      return generator;
    };

    generator.title = function (_) {
      if (!arguments.length) return title;
      title.class = typeof _.class !== 'undefined' ? _.class : title.class;
      title.x = typeof _.x !== 'undefined' ? _.x : title.x;
      title.y = typeof _.y !== 'undefined' ? _.y : title.y;
      title.dx = typeof _.dx !== 'undefined' ? _.dx : title.dx;
      title.dy = typeof _.dy !== 'undefined' ? _.dy : title.dy;
      title.transform = typeof _.transform !== 'undefined' ? _.transform : title.transform;
      title.anchor = typeof _.anchor !== 'undefined' ? _.anchor : title.anchor;
      title.text = typeof _.text !== 'undefined' ? _.text : title.text;
      return generator;
    };

    return generator;
  };
});
