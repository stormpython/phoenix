define(function (require) {
  var d3 = require('d3');
  var d3Components = require('d3_components');
  var layout = d3Components.layout.areaLine;
  var path = d3Components.element.path;
  var builder = d3Components.builder;

  return function line() {
    var options = {};
    var properties = {};
    var g;

    function generator(selection) {
      selection.each(function (data) {
        var pathLayout = builder(options, layout());
        var path = builder(properties, path());

        if (!g) {
          g = d3.select(this).append('g');
        }

        g.datum(pathLayout(data))
          .call(path);
      });
    }

    // Public API
    generator.options = function (_) {
      if (!arguments.length) { return options; }
      options = typeof _ === 'object' ? _ : options;
      return generator;
    };

    generator.properties = function (_) {
      if (!arguments.length) { return properties; }
      properties = typeof _ === 'object' ? _ : properties;
      return generator;
    };

    return generator;
  };
});
