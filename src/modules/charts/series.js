define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var valuator = require('src/modules/d3_components/helpers/valuator');
  var clipPathGenerator = require('src/modules/d3_components/generator/clippath');
  var axisGenerator = require('src/modules/d3_components/generator/axis/axis');
  var brushControl = require('src/modules/d3_components/control/brush');
  var events = require('src/modules/d3_components/control/events');
  var lineElement = require('src/modules/d3_components/generator/element/svg/line');
  var pathGenerator = require('src/modules/d3_components/generator/path');
  var barGenerator = require('src/modules/d3_components/generator/bars');
  var pointsGenerator = require('src/modules/d3_components/generator/points');

  return function series() {
    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 960;
    var height = 500;
    var accessor = function (d) { return d.data; };
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };

    var area = pathGenerator();
    var bar = barGenerator();
    var brush = brushControl();
    var clippath = clipPathGenerator();
    var line = pathGenerator();
    var points = pointsGenerator();
    var svgEvents = events();
    var zeroLine = lineElement();

    var axisFunctions = {
      left: axisGenerator(),
      bottom: axisGenerator(),
      right: axisGenerator(),
      top: axisGenerator()
    };

    var axes = {};
    var scales = {};
    var brushOpts = {};
    var zeroLineOpts = {};
    var areaOpts = {};
    var barOpts = {};
    var lineOpts = {};
    var pointOpts = {};
    var listeners = {};

    var svg;
    var g;
    var clippedG;

    function getAxesPositions(axes) {
      var positions = {left: [], bottom: [], right: [], top: []};

      d3.entries(axes).forEach(function (d) {
        if (!d.values.position) {
          if (d.key === 'x') positions['bottom'].push(d.values);
          if (d.key === 'y') positions['left'].push(d.values);
          if (d.key === 'y2') positions['right'].push(d.values);
          if (d.key === 'x2') positions['top'].push(d.values);
        } else {
          positions[d.values.position].push(d.values);
        }
      });

      return positions;
    }

    function getScale(scale) {

    }

    function chart(selection)  {
      selection.each(function (data) {
        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        // Scales

        // Axes
        var axisPositions = getAxesPositions(axes);

        d3.entries(axisPositions).forEach(function (d) {
          d.values.forEach(function (opts) {
            var axis = axisFunctions[d.key]
              .scale(opts.scale ? getScale(opts.scale) : scales[d.key])
              .size([adjustedWidth, adjustedHeight]);

            g.call(builder(opts, axis));
          });
        });

        // Brush
        brush
          .xScale(brushOpts.x ? x : null)
          .yScale(brushOpts.y ? y : null)
          .opacity(brushOpts.opacity)
          .clamp(brushOpts.clamp)
          .extent(brushOpts.extent)
          .height(adjustedHeight)
          .brushstart(listeners.brushstart)
          .brush(listeners.brush)
          .brushend(listeners.brushend);

        // Zero-line
        zeroLine
          .x1(function () { return x.range()[0]; })
          .x2(function () { return x.range()[1]; })
          .y1(function () { return y(0); })
          .y2(function () { return y(0); });

        // ClipPath
        clippath.width(adjustedWidth).height(adjustedHeight);

        /* ************************************************** */
        // SVG - create/update the svg
        if (!svg && !g) {
          svg = d3.select(this).append('svg');
          g = svg.append('g')
        }

        svg.attr('width', width)
          .attr('height', height)
          .call(svgEvents.listeners(listeners));

        g.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        g.call(brush);

        if (zeroLine.show) {
          g.append('g')
            .call(builder(zeroLine, zLine));
        }

        if (!clippedG) {
          clippedG = g.call(clippath).append('g');
        }

        clippedG.attr('clip-path', 'url(#' + clippath.id() + ')');
      });
    }

    // Public API
    chart.margin = function (_) {
      if (!arguments.length) return margin;
      margin.top = typeof _.top !== 'undefined' ? _.top : margin.top;
      margin.right = typeof _.right !== 'undefined' ? _.right : margin.right;
      margin.bottom = typeof _.bottom !== 'undefined' ? _.bottom : margin.bottom;
      margin.left = typeof _.left !== 'undefined' ? _.left : margin.left;
      return chart;
    };

    chart.width = function (_) {
      if (!arguments.length) return width;
      width = typeof _ === 'number' ? _ : width;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = typeof _ === 'number' ? _ : height;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return chart;
    };

    chart.scales = function (_) {
      if (!arguments.length) return scales;
      scales = _;
      return chart;
    };

    chart.axes = function (_) {
      if (!arguments.length) return axes;
      axes = _;
      return chart;
    };

    chart.brush = function (_) {
      if (!arguments.length) return brushOpts;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) return zeroLine;
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) return area;
      area = typeof _ === 'object' ? _ : area;
      return chart;
    };

    chart.bar = function (_) {
      if (!arguments.length) return bar;
      bar = typeof _ === 'object' ? _ : bar;
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) return line;
      line = typeof _ === 'object' ? _ : line;
      return chart;
    };

    chart.points = function (_) {
      if (!arguments.length) return points;
      points = typeof _ === 'object' ? _ : points;
      return chart;
    };

    chart.listeners = function (_) {
      if (!arguments.length) return listeners;
      listeners = typeof _ !== 'object' ? listeners : _;
      return chart;
    };

    return chart;
  };
});