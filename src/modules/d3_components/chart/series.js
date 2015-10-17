define(function (require) {
  var d3 = require('d3');
  var d3Components = require('d3_components');
  var builder = require('src/modules/d3_components/helpers/builder');
  var valuator = require('src/modules/d3_components/helpers/valuator');
  var clipPathGenerator = d3Components.generator.clipPath;
  var axisGenerator = d3Components.generator.axis;
  var brushControl = d3Components.control.brush;
  var events = d3Components.control.event;
  var lineElement = d3Components.element.line;
  var areaGenerator = d3Components.generator.path;
  var barGenerator = d3Components.generator.bars;
  var lineGenerator = d3Components.generator.path;
  var pointsGenerator = d3Components.generator.points;

  return function series() {
    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 960;
    var height = 500;
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var y2 = function (d) { return d.z; };
    var xScale = d3.scale.time.utc();
    var yScale = d3.scale.linear();
    var yScale2 = d3.scale.linear();
    var area = areaGenerator();
    var axis = axisGenerator();
    var bar = barGenerator();
    var brush = brushControl();
    var clippath = clipPathGenerator();
    var line = lineGenerator();
    var points = pointsGenerator();
    var svgEvents = events();
    var zeroLine = lineElement();
    var areaOpts = [];
    var axisOpts = [];
    var barOpts = [];
    var brushOpts = {};
    var lineOpts = [];
    var pointsOpts = [];
    var listeners = {};

    var svg;
    var g;
    var clippedG;

    function chart(selection)  {
      selection.each(function (data, index) {
        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        xScale
          .domain(d3.extent(d3.merge(data), x))
          .range([0, adjustedWidth]).nice();

        yScale
          .domain([
            Math.min(0, d3.min(d3.merge(data), function (d) {
              return d.y0
            })),
            Math.max(0, d3.max())
          ])
          .range([adjustedHeight, 0]);

        yScale2
          .domain([
            Math.min(0, d3.min(d3.merge(data), function (d) {

            })),
            Math.max(0, d3.max())
          ])
          .range([adjustedHeight, 0]);

        // SVG - create/update the svg
        if (!svg && !g) {
          svg = d3.select(this).append('svg');
          g = svg.append('g')
        }

        svg.attr('width', width)
          .attr('height', height)
          .call(svgEvents.listeners(listeners));
        g.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

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
        zLine
          .x1(function () { return x.range()[0]; })
          .x2(function () { return x.range()[1]; })
          .y1(function () { return y(0); })
          .y2(function () { return y(0); });

        // ClipPath
        clippath.width(adjustedWidth).height(adjustedHeight);

        /* ************************************************** */
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
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };

    chart.brush = function (_) {
      if (!arguments.length) return brushOpts;
      return chart;
    };

    chart.axis = function (_) {
      if (!arguments.length) return axis;
      axis = _;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) return zeroLine;
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

    chart.area = function (_) {
      if (!arguments.length) return area;
      area = typeof _ === 'object' ? _ : area;
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