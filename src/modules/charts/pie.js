define(function (require) {
  var d3 = require('d3');
  var path = require('src/modules/d3_components/generator/element/svg/path');
  var textElement = require('src/modules/d3_components/generator/element/svg/text');
  var valuator = require('src/modules/d3_components/utils/valuator');

  return function pieChart() {
    var accessor = function (d) { return d; };
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var color = d3.scale.category10();
    var width = 300;
    var height = 300;
    var outerRadius = null;
    var innerRadius = null;
    var donut = false;
    var sort = null;
    var value = function (d) { return d.y; };
    var label = function (d) { return d.name; };
    var pieClass = 'pie';
    var fill = function (d, i) {
      return color(label.call(this, d.data, i));
    };
    var stroke = '#ffffff';
    var text = {};

    function chart (g) {
      g.each(function (data, index) {
        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;
        var pie = d3.layout.pie()
          .sort(sort)
          .value(value);

        var radius = Math.min(adjustedWidth, adjustedHeight) / 2;
        var arc = d3.svg.arc()
          .outerRadius(outerRadius || radius)
          .innerRadius(innerRadius || function () {
              if (donut) return Math.max(0, radius / 2);
              return 0;
            });

        var piePath = path()
          .path(function (d) { return arc(d); })
          .class(pieClass)
          .fill(fill)
          .stroke(stroke);

        var pieText = textElement()
          .transform(text.transform || function (d) {
              return 'translate(' + arc.centroid(d) + ')';
            })
          .dy(text.dy || '.35em')
          .anchor(text.anchor || 'middle')
          .fill(text.fill || '#ffffff')
          .text(function (d, i) {
            return label.call(this, d.data, i);
          });

        data = pie(accessor.call(this, data, index))
          .map(function (d) { return [d]; });

        var g = d3.select(this).selectAll('g.pie').data([data]);

        g.exit().remove();
        g.enter().append('g');
        g.attr('class', 'pie')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var slice = g.selectAll('g.slice')
          .data(function (d) { return d; });

        slice.exit().remove();
        slice.enter().append('g');
        slice
          .attr('class', 'slice')
          .call(piePath)
          .call(pieText);
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
      if (!arguments.length) { return width; }
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return chart;
    };

    chart.outerRadius = function (_) {
      if (!arguments.length) { return outerRadius; }
      outerRadius = _;
      return chart;
    };

    chart.innerRadius = function (_) {
      if (!arguments.length) { return innerRadius; }
      innerRadius = _;
      return chart;
    };

    chart.sort = function (_) {
      if (!arguments.length) { return sort; }
      sort = _;
      return chart;
    };

    chart.donut = function (_) {
      if (!arguments.length) return donut;
      donut = typeof _ === 'boolean' ? _ : donut;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) { return value; }
      value = valuator(_);
      return chart;
    };

    chart.label = function (_) {
      if (!arguments.length) { return label; }
      label = valuator(_);
      return chart;
    };

    chart.class = function (_) {
      if (!arguments.length) { return pieClass; }
      pieClass = _;
      return chart;
    };

    chart.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return chart;
    };

    chart.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return chart;
    };

    chart.text = function (_) {
      if (!arguments.length) { return text; }
      text.fill = typeof _.fill !== 'undefined' ? _.fill : text.fill;
      text.anchor = typeof _.anchor !== 'undefined' ? _.anchor: text.anchor;
      text.dy = typeof _.dy !== 'undefined' ? _.dy : text.dy;
      text.transform = typeof _.transform !== 'undefined' ? _.transform : text.transform;
      return chart;
    };

    return chart;
  };
});
