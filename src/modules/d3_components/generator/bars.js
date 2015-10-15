define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_generators/layout/bars');
  var rect = require("src/modules/element/svg/rect");
  var builder = require("builder");

  return function bars() {
    var options = {};
    var properties = {};

    function generator(selection) {
      selection.each(function (data) {
        var barLayout = builder(options, layout());
        var rects = builder(properties, rect());

        d3.select(this).append("g")
          .selectAll("g")
          .data(barLayout(data))
          .enter().append("g")
          .call(rects);
      });
    }

    // Public API
    generator.options = function (_) {
      if (!arguments.length) return options;
      options = typeof _ === 'object' ? _ : options;
      return generator;
    };

    generator.properties = function (_) {
      if (!arguments.length) return properties;
      properties = typeof _ === 'object' ? _ : properties;
      return generator;
    };

    return generator;
  };
});