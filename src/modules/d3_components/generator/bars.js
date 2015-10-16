define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_generators/layout/bars');
  var rect = require("src/modules/element/svg/rect");
  var builder = require("builder");

  return function bars() {
    var barLayout = layout();
    var rects = rect();
    var property = {};
    var attr = {};
    var g;

    function generator(selection) {
      selection.each(function (data) {
        barLayout = builder(property, barLayout);
        rects = builder(attr, rects);

        if (!g) {
          g = d3.select(this).append("g");
        }

        g.selectAll("g")
          .data(barLayout(data))
          .enter().append("g")
          .call(rects);
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