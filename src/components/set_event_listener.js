define(function () {
  return function (value, self) {
    return function (event, listener) {
      if (!self.chart) throw new Error("Invalid chart options");
      if (!self.selection) throw new Error("A valid element is required");

      self.chart[value](event, listener); // value => 'on' or 'off'
      self._listeners = self.chart.listeners(); // Redefine listeners

      self.remove();
      self.selection.call(self.chart); // Redraw chart
    };
  };
});