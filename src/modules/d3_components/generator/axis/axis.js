define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var rotate = require('src/modules/d3_components/generator/axis/rotate');

  function getTransform(position, size) {
    var width = size[0];
    var height = size[1];

    if (position === 'bottom') return 'translate(0,' + height + ')';
    if (position === 'right') return 'translate(' + width + ',0)';
    if (position === 'left' || position === 'top') return 'translate(0,0)';
  }

  function getAxisClass(position) {
    if (position === 'bottom') return 'x axis';
    if (position === 'left') return 'y axis';
    if (position === 'right') return 'y2 axis';
    if (position === 'top') return 'x2 axis';
  }

  function getAxisOrientation(position, axis) {
    return axis.orient(position);
  }

  return function axes() {
    var scale = d3.scale.linear();
    var position = 'bottom';
    var size = [0, 1];
    var tick = {};
    var rotateLabels = {};
    var title = {};
    var axis = d3.svg.axis();
    var g;
    var rotation;
    var text;

    function generator(selection) {
      selection.each(function () {
        axis = getAxisOrientation(position, axis)
          .scale(scale)
          .ticks(tick.number || 10)
          .tickValues(tick.values || null)
          .tickSize(tick.size || 6)
          .innerTickSize(tick.innerTickSize || 6)
          .outerTickSize(tick.outerTickSize || 6)
          .tickPadding(tick.padding || 3)
          .tickFormat(tick.format || null);

        if (!g) {
          g = d3.select(this).append('g');
        }

        // Attach axis
        g.attr('class', getAxisClass(position))
          .attr('transform', getTransform(position, size))
          .call(axis);

        if (rotateLabels.allow) {
          var axisLength = Math.abs(scale.range()[1] - scale.range()[0]);

          if (!rotation) rotation = rotate();

          rotation.axisLength(axisLength);
          g.call(builder(rotateLabels, rotation));
        }

        if (!text) {
          text = g.append('text');
        }

        g.attr('class', title.class || 'axis title')
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
    generator.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
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
