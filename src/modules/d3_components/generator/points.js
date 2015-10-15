define(function (require) {
  var d3 = require("d3");
  var layout = require('src/modules/d3_components/layout/scatter');
  var circle = require("src/modules/element/svg/circle");
  var builder = require("builder");

  return function points() {
    var options = {};
    var properties = {};

    function component(selection) {
      selection.each(function (data) {
        var scatterLayout = builder(options, layout());
        var circles = builder(properties, circle());

        d3.select(this).append("g")
          .datum(scatterLayout(data))
          .call(circles);
      });
    }

    // Public API
    component.options = function (_) {
      if (!arguments.length) { return options; }
      options = typeof _ === 'object' ? _ : options;
      return component;
    };

    component.properties = function (_) {
      if (!arguments.length) { return properties; }
      properties = typeof _ === 'object' ? _ : properties;
      return component;
    };

    return component;
  };
});
