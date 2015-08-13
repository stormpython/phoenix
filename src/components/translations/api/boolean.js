define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "boolean") {
      throw new Error("default value must be of type boolean");
    }

    return function (_) {
      if (!arguments.length) return defaultVal;
      if (typeof _ !== "boolean") throw new Error("A boolean is expected");
      return _;
    };
  };
});
