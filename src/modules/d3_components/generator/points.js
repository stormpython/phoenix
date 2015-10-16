define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_generators/layout/points');
  var circle = require("src/modules/element/svg/circle");
  var builder = require("builder");

  return function points() {
    var scatterLayout = layout();
    var circles = circle();
    var property = {};
    var attr = {};
    var g;

    function generator(selection) {
      selection.each(function (data) {
        scatterLayout = builder(property, scatterLayout);
        circles = builder(attr, circles);

        if (!g) {
          g = d3.select(this).append("g");
        }

        g.datum(scatterLayout(data))
          .call(circles);
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
