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

    var brush = brushControl();
    var clippath = clipPathGenerator();
    var stack = d3.layout.stack();
    var svgEvents = events();
    var zeroLine = lineElement();
    var axisFunctions = {
      bottom: axisGenerator(),
      left: axisGenerator(),
      top: axisGenerator(),
      right: axisGenerator()
    };
    var elemFunctions = {
      area: pathGenerator().type('area'),
      bar: barGenerator(),
      line: pathGenerator().type('line'),
      points: pointsGenerator()
    };

    var listeners = {};
    var xAxes = [];
    var yAxes = [];
    var brushOpts = {};
    var stackOpts = {};
    var zeroLineOpts = {};
    var elements = {
      area: {},
      bar: {},
      line: [],
      points: []
    };

    var svg;
    var g;
    var clippedG;

    function chart(selection)  {
      selection.each(function (data, index) {
        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        data = accessor.call(this, data, index);

        // Stack data
        stack.x(x).y(y)
          .offset(stackOpts.offset || 'zero')
          .order(stackOpts.order || 'default')
          .out(stackOpts.out || function (d, y0, y) {
            d.y0 = y0;
            d.y = y;
          });

        // Brush
        brush
          .height(adjustedHeight)
          .opacity(brushOpts.opacity)
          .clamp(brushOpts.clamp)
          .extent(brushOpts.extent)
          .brushstart(listeners.brushstart)
          .brush(listeners.brush)
          .brushend(listeners.brushend);

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

        g.data([stack(data)])
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        // Axes
        [xAxes, yAxes].forEach(function (axis) {
          axis.forEach(function (opts) {
            var generator = axisFunctions[opts.position]
              .size([adjustedWidth, adjustedHeight]);

            g.call(builder(opts, generator));
          });
        });

        // Brush
        if (listeners.brushstart || listeners.brush || listeners.brushend) {
          brush.xScale(axisFunctions.bottom.scale())
            .yScale(axisFunctions.left.scale());

          g.call(brush);
        }

        // Zero line
        if (zeroLineOpts.show) {
          zeroLine
            .x1(function () { return axisFunctions.bottom.scale().range()[0]; })
            .x2(function () { return axisFunctions.bottom.scale().range()[1]; })
            .y1(function () { return axisFunctions.left.scale()(0); })
            .y2(function () { return axisFunctions.left.scale()(0); });

          g.call(builder(zeroLineOpts, zeroLine));
        }

        // Clippath
        if (!clippedG) {
          clippedG = g.call(clippath).append('g')
            .attr('clip-path', 'url(#' + clippath.id() + ')');
        }

        // Elements - bars, area, line, points
        d3.entries(elements).forEach(function (d) {
          if (Object.keys(d.value).length) {
            if (!Array.isArray(d.value)) d.value = [d.value];

            d.value.forEach(function (e) {
              var xAxisPosition = e.xAxis || 'bottom';
              var yAxisPosition = e.yAxis || 'left';
              var xScale = axisFunctions.bottom.scale();
              var yScale = axisFunctions.left.scale();
              var generator = elemFunctions[d.key]
                .xScale(xAxisPosition ? axisFunctions[xAxisPosition].scale() : xScale)
                .yScale(yAxisPosition ? axisFunctions[yAxisPosition].scale() : yScale);

              if (typeof generator.offset === 'function') {
                generator.offset(stackOpts.offset);
              }

              clippedG.call(builder(e, generator));
            });
          }
        });
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

    chart.stack = function (_) {
      if (!arguments.length) return stackOpts;
      stackOpts = _;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) return xAxes;
      if (Array.isArray(_)) xAxes = _;
      if (typeof _ === 'object' && !Array.isArray(_)) xAxes.push(_);
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) return yAxes;
      if (Array.isArray(_)) yAxes = _;
      if (typeof _ === 'object' && !Array.isArray(_)) yAxes.push(_);
      return chart;
    };

    chart.brush = function (_) {
      if (!arguments.length) return brushOpts;
      brushOpts = _;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) return zeroLineOpts;
      zeroLineOpts = _;
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) return elements.area;
      elements.area = typeof _ === 'object' ? _ : elements.area;
      return chart;
    };

    chart.bar = function (_) {
      if (!arguments.length) return elements.bar;
      elements.bar = typeof _ === 'object' ? _ : elements.bar;
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) return elements.line;
      if (Array.isArray(_)) elements.line = _;
      if (typeof _ === 'object' && !Array.isArray(_)) elements.line.push(_);
      return chart;
    };

    chart.points = function (_) {
      if (!arguments.length) return elements.points;
      if (Array.isArray(_)) elements.points = _;
      if (typeof _ === 'object' && !Array.isArray(_)) elements.points.push(_);
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