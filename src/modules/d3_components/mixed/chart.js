define(function (require) {
  var d3 = require('d3');
  var charts = require('src/modules/charts/index');

  return function chart() {
    var opts = {};

    function generator(selection) {
      selection.each(function (data) {
        var dataOpts = data && data.options || {};
        var chartType = dataOpts.type || opts.type || 'series';
        var accessor = dataOpts.accessor || opts.accessor || 'data';
        var chart = charts[chartType]()
          .width(data.width)
          .height(data.height)
          .accessor(accessor);

        [opts, dataOpts].forEach(function (o) {
          d3.entries(o).forEach(function (d) {
            if (typeof chart[d.key] === 'function') {
              chart[d.key](d.value);
            }
          });
        });

        d3.select(this).call(chart); // Draw Chart
      });
    }

    generator.options = function (_) {
      if (!arguments.length) return opts;
      opts = typeof _ === 'object' && !Array.isArray(_) ? _ : opts;
      return generator;
    };

    return generator;
  };
});