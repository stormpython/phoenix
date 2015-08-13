define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "function") {
      throw new Error("default value must be of type function");
    }

    return function (_) {
      if (!arguments.length) return defaultVal;
      if (typeof _ !== "function") throw new Error("A function is expected");
      return _;
    };
  };
});
