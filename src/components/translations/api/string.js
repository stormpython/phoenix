define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "string") {
      throw new Error("default value must be of type string");
    }

    return function (_) {
      if (!arguments.length) return defaultVal;
      if (typeof _ !== "string") throw new Error("A string is expected");
      return _;
    };
  };
});