define(function (require) {
  var d3 = require('d3');
  var charts = require('src/modules/charts/index');
  var builder = require('src/modules/d3_components/utils/builder');

  return function graph() {
    var opts = {};

    function generator(selection) {
      selection.each(function (data) {
        var dataOpts = (data && data.options) || {};
        var chartType = dataOpts.type || opts.type || 'series';
        var accessor = dataOpts.accessor || opts.accessor || 'data';
        var chart = charts[chartType]()
          .width(data.width)
          .height(data.height)
          .accessor(accessor);

        [opts, dataOpts].forEach(function (o) {
          builder(o, chart);
        });

        d3.select(this).call(chart); // Draw Chart
      });
    }

    // Public API
    generator.options = function (v) {
      if (!arguments.length) { return opts; }
      opts = typeof v === 'object' && !Array.isArray(v) ? v : opts;
      return generator;
    };

    return generator;
  };
});
