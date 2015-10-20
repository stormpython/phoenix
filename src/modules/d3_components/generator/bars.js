define(function (require) {
  var d3 = require('d3');
  var builder = require('src/modules/d3_components/helpers/builder');
  var vertical = require('src/modules/d3_components/layout/bars/vertical');
  var horizontal = require('src/modules/d3_components/layout/bars/horizontal');
  var rect = require('src/modules/d3_components/generator/element/svg/rect');

  return function bars() {
    var rects = rect();
    var property = {};
    var attr = {};
    var barLayout;
    var g;

    if (!property.orientation) property.orientation = 'vertical';
    barLayout = property.orientation === 'vertical' ? vertical() : horizontal();

    function generator(selection) {
      selection.each(function (data) {
        barLayout = builder(property, barLayout);
        rects = builder(attr, rects);

        if (!g) {
          g = d3.select(this).append('g')
            .attr('class', 'bar-layers');
        }

        var layers = g.selectAll('g')
          .data(barLayout(data));

        layers.exit().remove();
        layers.enter().append('g');
        layers.call(rects);
      });
    }

    // Public API
    generator.property = function (prop, val) {
      if (!arguments.length) return property;
      if (arguments.length === 1 && typeof prop === 'object') {
        property = _;
      }
      if (arguments.length === 2) {
        property[prop] = val;
      }
      return generator;
    };

    generator.attr = function (prop, val) {
      var validAttr = ['class', 'fill', 'stroke', 'strokeWidth', 'opacity'];
      var isValidProp = validAttr.indexOf(prop) !== -1;

      if (!arguments.length) return attr;
      if (arguments.length === 1 && typeof prop === 'object') {
        attr = _;
      }
      if (arguments.length === 2 && isValidProp) {
        attr[prop] = val;
      }
      return generator;
    };

    return generator;
  };
});