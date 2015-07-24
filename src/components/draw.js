/**
 * Returns a function that accepts optional width and height
 * parameters for drawing chart(s).
 */
define(function (require) {
  var defineChart = require("define_chart");
  var layoutFunc = require("layout");
  var sizeFunc = require("size");

  function evaluate(self) {
    if (!self.selection || !self.selection.node()) {
      throw new Error("A valid element is required");
    }
    if (!self.data) throw new Error("No data provided");
    if (!self.opts) throw new Error("No options given");
  }

  function getChartSize(selection) {
    return selection.datum().map(function (d) {
      return [d.width, d.height];
    })[0];
  }

  return function (self) {
    return function (width, height) {
      var layout = self.layout = layoutFunc()
        .layout(self.opts.layout || "rows");
      var size;
      var selection;
      var chartSize;

      evaluate(self);
      self.chart = defineChart(self.data, self.opts); // Create chart function
      self.remove(); // Remove previous charts if any
      size = sizeFunc().width(width).height(height)(self.selection);

      if (size[0] >= 0 || size[1] >= 0) return; // size = [width, height]

      selection = self.selection.call(layout.size(size));
      chartSize = getChartSize(selection);
      selection.call(self.chart.width(chartSize[0]).height(chartSize[1]));
    };
  };
});