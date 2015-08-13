define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "string") {
      throw new Error("default value must be of type string");
    }

    return function (_) {
      if (!arguments.length) return function (d) { return d[defaultVal]; };
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    };
  };
});