define(function (require) {
  var jee = require("jubilee");
  var defaultOptions = require("options");

  return function chart() {
    var opts = null;

    function component(selection) {
      selection.each(function (data, index) {
        var div = d3.select(this);
        var type = data.options.type || opts.type || "bar";
        var defaults = defaultOptions[type];
        var values = data.options.values || opts.values || getValues;
        var chart = jee.chart[type]()
          .width(data.width)
          .height(data.height);

        Object.keys(defaults).forEach(function (attr) {
          if (data.options[attr]) {
            chart[attr](data.options[attr]);
          } else if (opts[attr]) {
            chart[attr](opts[attr]);
          } else {
            chart[attr](defaults[attr]);
          }
        });

        div.datum(values).call(chart); // Draw Chart
      });
    }

    function getValues (d) {
      return d.values;
    }

    component.options = function (_) {
      if (!arguments.length) return opts;
      opts = _;
      return component;
    };

    return component;
  };
});