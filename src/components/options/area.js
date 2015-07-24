define(function (require) {
  return {
    margin: function (_) {
      var defaults = require("options/defaults/margin");

      if (!arguments.length || !_) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");

      _.top = typeof _.top !== "undefined" ? _.top : defaults.top;
      _.right = typeof _.right !== "undefined" ? _.right : defaults.right;
      _.bottom = typeof _.bottom !== "undefined" ? _.bottom : defaults.bottom;
      _.left = typeof _.left !== "undefined" ? _.left : defaults.left;
      return _;
    },
    x: function (_) {
      if (!arguments.length || !_) {
        return function (d) { return d.x; };
      }
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    },
    y: function (_) {
      if (!arguments.length || !_) {
        return function (d) { return d.x; };
      }
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    },
    defined: function (_) {
      if (!arguments.length || !_) return true;
      if (typeof _ !== "boolean") throw new Error("A boolean is expected");
      return _;
    },
    interpolate: function (_) {
      if (!arguments.length || !_) return "linear";
      if (typeof _ !== "string") throw new Error("A string is expected");
      return _;
    },
    zeroLine: function (_) {
      if (!arguments.length || !_) return true;
      if (typeof _ !== "boolean") throw new Error("A boolean is expected");
      return _;
    },
    color: function (_) {
      var defaults = require("options/defaults/color");

      if (!arguments.length || !_) return defaults;
      if (typeof _ !== "function") throw new Error("A function is expected");

      return _;
    },
  };
});