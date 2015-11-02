define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var valuator = require('src/modules/d3_components/helpers/valuator');
  var stackOut = require('src/modules/d3_components/helpers/stack_neg_pos');
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
    var timeInterval = null;
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
    var elements = { area: {}, bar: {}, line: [], points: [] };

    function formatData(data) {
      var isArrayOfObjects = data.every(function (d) {
        return typeof d === 'object' && !Array.isArray(d);
      });

      return isArrayOfObjects ? [data] : data;
    }

    function chart(selection)  {
      selection.each(function (data, index) {
        data = formatData(accessor.call(this, data, index));

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        // Stack data
        var out = elements.bar.show ?
          stackOut().stackCount(data.length) : defaultOut;

        stack.x(x).y(y)
          .offset(stackOpts.offset || 'zero')
          .order(stackOpts.order || 'default')
          .out(stackOpts.out || out);

        // Brush
        brush
          .height(adjustedHeight)
          .opacity(brushOpts.opacity || 0.1)
          .brushstart(listeners.brushstart)
          .brush(listeners.brush)
          .brushend(listeners.brushend);

        // ClipPath
        clippath.width(adjustedWidth).height(adjustedHeight);
        /* ************************************************** */
        data = stack(data);

        // SVG - create/update the svg
        var svg = d3.select(this).selectAll('svg').data([data]);
        svg.exit().remove();
        svg.enter().append('svg');
        svg.attr('width', width)
          .attr('height', height)
          .call(svgEvents.listeners(listeners));

        var g = svg.selectAll('g').data([data]);
        g.exit().remove();
        g.enter().append('g');
        g.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        // Axes
        [xAxes, yAxes].forEach(function (axis) {
          axis.forEach(function (opts) {
            var generator = axisFunctions[opts.position]
              .size([adjustedWidth, adjustedHeight])
              .timeInterval(timeInterval);

            g.call(builder(opts, generator));
          });
        });

        // Brush
        if (listeners.brushstart || listeners.brush || listeners.brushend) {
          if (brushOpts.y) brush.yScale(axisFunctions.left.scale());

          brush.xScale(axisFunctions.bottom.scale());
          g.call(brush);
        }

        // Zero line
        if (zeroLineOpts.show) {
          zeroLine
            .x1(function () {
              return axisFunctions.bottom.scale()(0);
              //return axisFunctions.bottom.scale().range()[0];
            })
            .x2(function () {
              return axisFunctions.bottom.scale()(0);
              //return axisFunctions.bottom.scale().range()[1];
            })
            .y1(function () {
              return axisFunctions.left.scale().range()[0];
              //return axisFunctions.left.scale()(0);
            })
            .y2(function () {
              return axisFunctions.left.scale().range()[1];
              //return axisFunctions.left.scale()(0);
            })
            .stroke(zeroLineOpts.stroke || "#000000")
            .strokeWidth(zeroLineOpts.strokeWidth || 1)
            .opacity(zeroLineOpts.opacity || 0.2);

          var zeroLineG = g.selectAll('.zero-line').data([data]);
          zeroLineG.exit().remove();
          zeroLineG.enter().append('g');
          zeroLineG
            .attr('class', 'zero-line')
            .call(zeroLine);
        }

        // Clippath
        var clippedG = g.call(clippath)
          .selectAll('g.clip-path').data([data]);
        clippedG.exit().remove();
        clippedG.enter().append('g');
        clippedG.attr('class', 'clip-path')
          .attr('clip-path', 'url(#' + clippath.id() + ')');

        // Elements - bars, area, line, points
        d3.entries(elements).forEach(function (d) {
          if (!Array.isArray(d.value)) d.value = [d.value];

          d.value.forEach(function (e) {
            if (e.show) {
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

              if (typeof generator.timeInterval === 'function') {
                generator.timeInterval(timeInterval);
              }

              clippedG.call(builder(e, generator));
            }
          });
        });
      });
    }

    function defaultOut(d, y0, y) {
      d.y0 = y0;
      d.y = y;
    }

    // Public API
    chart.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return chart;
    };

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

    chart.stack = function (_) {
      if (!arguments.length) return stackOpts;
      stackOpts = _;
      return chart;
    };

    chart.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = _;
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
      brushOpts = typeof _ === 'object' ? _ : brushOpts;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) return zeroLineOpts;
      zeroLineOpts = typeof _ === 'object' ? _ : zeroLineOpts;
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