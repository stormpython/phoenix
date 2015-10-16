define(function (require) {
  var d3 = require('d3');
  var d3Components = require('d3_components');
  var builder = require('src/modules/d3_components/helpers/builder');
  var valuator = require('src/modules/d3_components/helpers/valuator');
  var addEventListener = require('src/modules/d3_components/helpers/add_event_listener');
  var removeEventListener = require('src/modules/d3_components/helpers/remove_event_listener');
  var clip = d3Components.generator.clipPath;
  var axis = d3Components.generator.axis;
  var brushComponent = d3Components.control.brush;
  var events = d3Components.control.event;
  var zeroAxisLine = d3Components.element.line;
  var areas = d3Components.generator.path;
  var bars = d3Components.generator.bars;
  var circles = d3Components.generator.points;
  var lines = d3Components.generator.path;

  return function series() {
    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 960;
    var height = 500;
    var accessor = function (d) { return d; };
    var xAxis = {
      show: true,
      gridlines: false,
      class: 'x axis',
      transform: null,
      tick: {},
      tickText: { anchor: 'middle', x: 0, y: 9, dx: '', dy: '.71em' },
      rotateLabels: { allow: true },
      title: { anchor: 'middle' }
    };
    var yAxis = {
      show: true,
      gridlines: false,
      class: 'y axis',
      transform: null,
      tick: {},
      tickText: { anchor: 'end', x: -9, y: 0, dy: '.32em' },
      rotateLabels: {},
      title: { x: 0, y: -40, anchor: 'middle' }
    };
    var zAxis = {
      show: false,
      gridlines: false,
      class: 'z axis',
      transform: null,
      tick: {},
      tickText: { anchor: 'start', x: 9, y: 0, dy: '.32em' },
      rotateLabels: {},
      title: {}
    };
    var brushOpts = {
      class: 'brush',
      x: true,
      y: false,
      opacity: 0.2,
      extent: null,
      clamp: false
    };
    var zeroLine = {
      show: false,
      class: 'zero-line',
      stroke: '#000000',
      strokeWidth: 1,
      opacity: 0.5
    };

    var bar = {};
    var line = {};
    var area = {};
    var points = {};
    var listeners = {};

    var svgEvents = events();
    var brush = brushComponent();
    var zLine = zeroAxisLine();
    var clippath = clip();
    var svg;
    var g;
    var clippedG;

    function chart(selection)  {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        svgEvents.listeners(listeners);

        /* Canvas ******************************** */
        if (!svg) {
          svg = d3.select(this).append('svg');
        }

        svg.attr('width', width)
          .attr('height', height)
          .call(svgEvents);

        if (!g) {
          g = svg.append('g')
        }

        g.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        /* ******************************** */

        /* Brush ******************************** */
        brush.class(brushOpts.class)
          .xScale(brushOpts.x ? x : null)
          .yScale(brushOpts.y ? y : null)
          .opacity(brushOpts.opacity)
          .clamp(brushOpts.clamp)
          .extent(brushOpts.extent)
          .height(adjustedHeight)
          .brushstart(listeners.brushstart)
          .brush(listeners.brush)
          .brushend(listeners.brushend);

        g.call(brush);
        /* ******************************** */

        /* Zero-line ******************************** */
        if (zeroLine.show) {
          zLine
            .x1(function () { return x.range()[0]; })
            .x2(function () { return x.range()[1]; })
            .y1(function () { return y(0); })
            .y2(function () { return y(0); });

          g.append('g')
            .call(builder(zeroLine, zLine));
        }
        /* ******************************** */


        /* ClipPath ******************************** */
        clippath.width(adjustedWidth).height(adjustedHeight);

        if (!clippedG) {
          clippedG = g.call(clippath).append('g');
        }

        clippedG.attr('clip-path', 'url(#' + clippath.id() + ')');
        /* ******************************** */

        /* SVG Elements ******************************** */
        /* ******************************** */
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
      brushOpts.class = typeof _.clamp !== 'undefined' ? _.clamp : brushOpts.clamp;
      brushOpts.x = typeof _.x !== 'undefined' ? _.x : brushOpts.x;
      brushOpts.y = typeof _.y !== 'undefined' ? _.y : brushOpts.y;
      brushOpts.opacity = typeof _.opacity !== 'undefined' ? _.opacity : brushOpts.opacity;
      brushOpts.clamp = typeof _.clamp !== 'undefined' ? _.clamp : brushOpts.clamp;
      brushOpts.extent = typeof _.extent !== 'undefined' ? _.extent : brushOpts.extent;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return chart;
    };

    chart.axis = function (_) {
      if (!arguments.length) return axis;
      axis = _;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) return zeroLine;
      zeroLine.show = typeof _.show !== 'undefined' ? _.show : zeroLine.show;
      zeroLine.class = typeof _.class !== 'undefined' ? _.class : zeroLine.class;
      zeroLine.stroke = typeof _.stroke !== 'undefined' ? _.stroke : zeroLine.stroke;
      zeroLine.strokeWidth = typeof _.strokeWidth !== 'undefined' ? _.strokeWidth : zeroLine.strokeWidth;
      zeroLine.opacity = typeof _.opacity !== 'undefined' ? _.opacity : zeroLine.opacity;
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

    chart.on = addEventListener(chart);

    chart.off = removeEventListener(chart);

    return chart;
  };
});