/**
 * Returns a count of event listeners from a listeners object.
 */
define(function () {
  return function (listeners) {
    return Object.keys(listeners).map(function (event) {
      return listeners[event].length;
    }).reduce(function (a, b) {
      return a + b;
    }, 0);
  };
});