define(function (require) {
  var chartTypes = require("components/chart_types");

  return function (data, opts) {
    if (!opts.type) {
      throw new Error("A chart type has not been not specified.");
    }

    var chart = chartTypes[opts.type] || chartTypes["bar"];
    return chart(data, opts);
  };
});