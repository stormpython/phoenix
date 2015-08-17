define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "number") {
      throw new Error("default value must be of type number");
    }

    return function (_) {
      if (!arguments.length) return defaultVal;
      if (typeof _ !== "number") throw new Error("A number is expected");
      return _;
    };
  };
});