define(function () {
  /**
   * Returns a function that returns an array of
   * the width and height of a DOM element.
   * Accepts either a function that returns a
   * number or a number as values for width and height.
   * Or if width and height are undefined, it uses the
   * clientWidth and clientHeight from the DOM element.
   * Validates that the width and height are valid numbers.
   */

  return function size() {
    var width = null;
    var height = null;

    function component(selection) {
      var node = selection.node();
      var w = typeof width === "function" ? width() : width || node.clientWidth;
      var h = typeof height === "function" ? height() : height ||
      node.clientHeight;

      if (typeof +w !== "number" || isNaN(+w) ||
        typeof +h !== "number" || isNaN(+h)) {
        throw new Error("width: " + w + " and height: " + h +
          " must evaluate to a number.");
      }

      return [+w, +h];
    }

    component.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return component;
    };

    component.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return component;
    };

    return component;
  };
});
