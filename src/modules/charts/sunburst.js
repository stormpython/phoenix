define(function (require) {
  var d3 = require('d3');
  var path = require('src/modules/d3_components/generator/element/svg/path');
  var events = require('src/modules/d3_components/control/events');
  var valuator = require('src/modules/d3_components/helpers/valuator');

  return function sunburst() {
    // Private variables
    var accessor = function (d) { return d; };
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var width = 500;
    var height = 500;
    var color = d3.scale.category10();
    var sort = null;
    var value = function (d) { return d.size; };
    var xScale = d3.scale.linear().range([0, 2 * Math.PI]);
    var yScale = d3.scale.sqrt();
    var startAngle = function (d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x)));
    };
    var endAngle = function (d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x + d.dx)));
    };
    var innerRadius = function (d) {
      return Math.max(0, yScale(d.y));
    };
    var outerRadius = function (d) {
      return Math.max(0, yScale(d.y + d.dy));
    };

    // Pie options
    var pieClass = 'slice';
    var stroke = '#ffffff';
    var fill = function (d, i) {
      if (d.depth === 0) return 'none';
      return color(i);
    };
    var listeners = {};

    function chart (selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.right - margin.left;
        var adjustedHeight = height - margin.top - margin.bottom;
        var radius = Math.min(adjustedWidth, adjustedHeight) / 2;

        yScale.range([0, radius]);

        var partition = d3.layout.partition()
          .sort(sort)
          .value(value);

        var arc = d3.svg.arc()
          .startAngle(startAngle)
          .endAngle(endAngle)
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var arcPath = path()
          .path(function (d) { return arc(d); })
          .class(pieClass)
          .stroke(stroke)
          .fill(fill);

        var svgEvents = events().listeners(listeners);

        var svg = d3.select(this).selectAll('svg')
          .data([data]);

        svg.exit().remove();
        svg.enter().append('svg');

        svg
          .attr('width', width)
          .attr('height', height)
          .call(svgEvents)
          .append('g')
          .datum(partition.nodes)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .call(arcPath);
      });
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
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };

    chart.sort = function (_) {
      if (!arguments.length) return sort;
      sort = _;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) return value;
      value = valuator(_);
      return chart;
    };

    chart.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return chart;
    };

    chart.startAngle = function (_) {
      if (!arguments.length) return startAngle;
      startAngle = d3.functor(_);
      return chart;
    };

    chart.endAngle = function (_) {
      if (!arguments.length) return endAngle;
      endAngle = d3.functor(_);
      return chart;
    };

    chart.innerRadius = function (_) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3.functor(_);
      return chart;
    };

    chart.outerRadius = function (_) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3.functor(_);
      return chart;
   };

    chart.class = function (_) {
      if (!arguments.length) return pieClass;
      pieClass = typeof _ !== 'string' ? pieClass : _;
      return chart;
    };

    chart.stroke = function (_) {
      if (!arguments.length) return stroke;
      stroke = _;
      return chart;
    };

    chart.fill = function (_) {
      if (!arguments.length) return fill;
      fill= _;
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
