define(function (require) {
  var defineChart = require("components/define_chart");
  var layoutFunc = require("components/layout");
  var getChartSize = require("components/get_chart_size");
  var getSize = require("components/size");

  function evaluate(self) {
    if (!self.selection || !self.selection.node()) {
      throw new Error("A valid element is required");
    }
    if (!self.data) throw new Error("No data provided");
    if (!self.opts) throw new Error("No options given");
  }

  return function (self) {
    return function (width, height) {
      var layout = self.layout = layoutFunc().layout(self.opts.layout || "rows")
      var size;
      var selection;
      var chartSize;

      evaluate(self);
      self.chart = defineChart(self.data, self.opts); // Create chart function
      self.remove(); // Remove previous charts if any
      size = getSize().width(width).height(height)(self.selection);

      if (size[0] >= 0 || size[1] >= 0) return; // size = [width, height]

      selection = self.selection.call(layout.size(size));
      chartSize = getChartSize(selection);
      selection.call(self.chart.width(chartSize[0]).height(chartSize[1]));
    };
  };
});