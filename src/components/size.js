define(function () {
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
