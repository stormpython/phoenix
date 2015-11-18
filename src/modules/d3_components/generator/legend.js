define(function (require) {
  var d3 = require('d3');
  var base = require('src/modules/d3_components/layout/base');

  return function legend() {
    var color = d3.scale.category10();
    var layout = base();
    var shape = d3.svg.symbol();
    var size = [30, 90];
    var values = [];
    var orientation = 'vertical'; // 'horizontal, vertical, grid'
    var symbol = {};
    var text = {};

    function component(g) {
      g.each(function () {
        var layoutType = {
          vertical: 'rows',
          horizontal: 'columns',
          grid: 'grid'
        };

        // Mutate the values array
        values = values.map(function (d) {
          return {
            label: d
          };
        });

        shape
          .type(symbol.type || 'circle')
          .size(symbol.size || 90);

        layout
          .type(layoutType[orientation] || 'rows')
          .size(size);

        var cells = d3.select(this).selectAll('g.legend-cells')
          .data(layout(values));

        cells.exit().remove();
        cells.enter().append('g')
          .attr('legend-cells');

        cells
          .attr('transform', function (d) {
            return 'translate(' + d.dx + ',' + d.dy + ')';
          });

        cells.append('path')
          .attr('d', shape)
          .attr('fill', symbol.fill || getColor)
          .attr('fill-opacity', symbol.fillOpacity || 1)
          .attr('stroke', symbol.stroke || getColor)
          .attr('stroke-width', symbol.strokeWidth || 1)
          .attr('stroke-opacity', symbol.strokeOpacity || 1)
          .on('click', function () {
            var icon = d3.select(this);
            var noFill = icon.attr('fill') === '#ffffff';

            if (noFill) {
              icon.attr('fill', symbol.fill || getColor);
            } else {
              icon.attr('fill', '#ffffff');
            }
          });

        cells.append('text')
          .attr('x', text.x || 7)
          .attr('y', text.y || 0)
          .attr('dx', text.dx || '')
          .attr('dy', text.dy || '.35em')
          .attr('fill', text.fill || '#000000')
          .attr('pointer-events', text.pointerEvents || 'none')
          .style('text-anchor', text.anchor || 'start')
          .text(function (d) { return d.label; });
      });
    }

    function getColor(d) {
      return color(d.label);
    }

    // Public API
    component.values = function (_) {
      if (!arguments.length) return values;
      values = _;
      return component;
    };

    component.orientation = function (_) {
      if (!arguments.length) return orientation;
      orientation = _;
      return component;
    };

    component.size = function (_) {
      if (!arguments.length) return size;
      size = Array.isArray(_) ? _ : size;
      return component;
    };

    component.symbol = function (_) {
      if (!arguments.length) return symbol;
      symbol = _;
      return component;
    };

    component.text = function (_) {
      if (!arguments.length) return text;
      text = _;
      return component;
    };

    return component;
  };
});