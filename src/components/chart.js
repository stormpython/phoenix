define(function (require) {
  var jee = require("jubilee");

  return function chart() {
    var opts = null;

    function component(selection) {
      selection.each(function (data, index) {
        var div = d3.select(this);
        var type = data.options.type || opts.type || "bar";
        var chart = jee.chart[type]()
          .width(data.width)
          .height(data.height);

        if (opts) {
          Object.keys(opts).forEach(function (attr) {
            chart[attr](opts[attr]);
          });
        }

        if (data.options) {
          Object.keys(data.options).forEach(function (attr) {
            chart[attr](data.options[attr]);
          });
        }

        div.call(chart); // Draw Chart
      });
    }

    component.options = function (_) {
      if (!arguments.length) return opts;
      opts = _;
      return component;
    };

    return component;
  };
});