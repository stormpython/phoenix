define(function (require) {
  var d3 = require('d3');
  var valuator = require('src/modules/d3_components/utils/valuator');

  return function histogram() {
    var accessor = function (d) { return d; };
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = 900;
    var height = 500;
    var bins = null;
    var range = null;
    var frequency = 'frequency';
    var value = function (d) { return d.y; };
    var properties = {};
    var text = {};

    function chart(g) {
      g.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        var histogram = d3.layout.histogram()
          .bins(bins)
          .value(value)
          .frequency(frequency)
          .range(range || d3.extent(data, value));

        data = histogram(data);

        var xScale = d3.scale.linear()
          .domain(d3.extent(bins))
          .range([0, width]);

        var yScale = d3.scale.linear()
          .domain([0, d3.max(data, value)])
          .range([height, 0]);

        var g = d3.select(this).selectAll('g').data([data]);

        g.exit().remove();
        g.enter().append('g');
        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        g.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + yScale.range()[0] + ')')
          .call(xAxis);

        g.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        var group = g.selectAll('g').data(data);

        group.exit().remove();
        group.enter().append('g');
        group.append('rect')
          .attr('class', properties.class || 'rect')
          .attr('fill', properties.fill || 'blue')
          .attr('stroke', properties.stroke || 'white')
          .attr('stroke-width', properties.strokeWidth || 1)
          .style('opacity', properties.opacity || 1)
          .attr('x', function (d) { return xScale(d.x); })
          .attr('y', function (d) { return yScale(d.y); })
          .attr('width', function (d) { return xScale(d.dx); })
          .attr('height', function (d) { return yScale.range()[0] - yScale(d.y); });

        group.append('text')
          .attr('class', text.class || 'label')
          .attr('dy', text.dy || '.71em')
          .attr('y', function (d) { return yScale(d.y - 0.1); })
          .attr('x', function (d) { return xScale(d.x) + (xScale(d.dx) / 2); })
          .attr('text-anchor', text.textAnchor || 'middle')
          .attr('fill', text.fill || 'black')
          .text(function (d) { return !d.y ? '' : d.y; });
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
      width = typeof _ !== 'number' ? width : _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = typeof _ !== 'number' ? height : _;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) return value;
      value = valuator(_);
      return chart;
    };

    chart.bins = function (_) {
      if (!arguments.length) return bins;
      bins = _;
      return chart;
    };

    chart.frequency = function (_) {
      if (!arguments.length) return frequency;
      frequency = typeof _ !== 'string' ? frequency : _;
      return chart;
    };

    chart.range = function (_) {
      if (!arguments.length) return range;
      range = d3.functor(_);
      return chart;
    };

    chart.properties = function (_) {
      if (!arguments.length) return properties;
      properties.class = typeof _.class !== 'undefined' ? _.class : properties.class;
      properties.fill = typeof _.fill !== 'undefined' ? _.fill : properties.fill;
      properties.stroke = typeof _.stroke !== 'undefined' ? _.stroke : properties.stroke;
      properties.strokeWidth = typeof _.strokeWidth !== 'undefined' ? _.strokeWidth : properties.strokeWidth;
      return chart;
    };

    chart.text = function (_) {
      if (!arguments.length) { return text; }
      text.class = typeof _.class !== 'undefined' ? _.class : text.class;
      text.fill = typeof _.fill !== 'undefined' ? _.fill : text.fill;
      text.dy = typeof _.dy !== 'undefined' ? _.dy : text.dy;
      text.textAnchor = typeof _.textAnchor !== 'undefined' ? _.textAnchor : text.textAnchor;
      return chart;
    };

    return chart;
  };
});
