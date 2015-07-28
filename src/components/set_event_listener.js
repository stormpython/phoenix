/**
 * Returns a function that accepts an event type (e.g. 'click')
 * and an event listener function, and sets the event listener on the chart.
 */
define(function () {
  return function (value, self) {
    return function (event, listener) {
      if (!self._selection) throw new Error("A valid element is required");

      self._chart[value](event, listener); // value => 'on' or 'off'
      self._listeners = self._chart.listeners(); // Redefine listeners

      self.remove();
      self._selection.call(self._chart); // Redraw chart
    };
  };
});