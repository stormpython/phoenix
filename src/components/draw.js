/**
 * Returns a function that accepts optional width and height
 * parameters for drawing chart(s).
 */
define(function (require) {
  var sizeFunc = require("size");

  function evaluate(self) {
    if (!self.selection || !self.selection.node()) {
      throw new Error("A valid element is required");
    }
    if (!self.data) throw new Error("No data provided");
    if (!self.opts) throw new Error("No options given");
  }

  return function (self) {
    return function (width, height) {
      var layout = self._layout.layout(self.opts.layout || "rows");
      var chart;
      var size;

      evaluate(self);
      self.remove(); // Remove previous charts if any

      chart = self._chart.options(self.opts);
      size = sizeFunc().width(width).height(height)(self.selection);
      if (size[0] >= 0 || size[1] >= 0) return; // size = [width, height]

      self.selection
        .call(layout.size(size))
        .call(chart);
    };
  };
});