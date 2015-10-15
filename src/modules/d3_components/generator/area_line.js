define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_generators/layout/area_line');
  var path = require("src/modules/element/svg/path");
  var builder = require("builder");

  return function line() {
    var options = {};
    var properties = {};

    function generator(selection) {
      selection.each(function (data) {
        var pathLayout = builder(options, layout());
        var path = builder(properties, path());

        d3.select(this).append("g")
          .datum(pathLayout(data))
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
