define(function (require) {
  var d3 = require('d3');
  var d3Components = require('d3_components');
  var layout = d3Components.layout.path;
  var path = d3Components.element.path;
  var builder = d3Components.builder;

  return function paths() {
    var pathLayout = layout();
    var paths = path();
    var property = {};
    var attr = {};
    var g;

    function generator(selection) {
      selection.each(function (data) {
        pathLayout = builder(property, pathLayout);
        paths = builder(attr, paths);

        if (!g) {
          g = d3.select(this).append('g')
            .attr('class', 'path-layers')
        }

        var layers = g.selectAll('g')
          .data(pathLayout(data));

        layers.exit().remove();
        layers.enter().append('g');
        layers.call(paths);
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
      var validAttr = [
        'transform', 'class', 'fill', 'stroke', 'strokeWidth', 'opacity'
      ];
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
