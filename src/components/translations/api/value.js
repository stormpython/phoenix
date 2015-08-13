define(function () {
  return function (defaultVal) {
    return function (_) {
      if (!arguments.length) return function (d) { return d[defaultVal]; };
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    };
  };
});