define(function () {
  return function (defaultVal) {
    if (typeof defaultVal !== "object") {
      throw new Error("default value must be of type object");
    }

    return function (_) {
      if (!arguments.length) return defaultVal;
      if (typeof _ !== "object") throw new Error("An object is expected");

      Object.keys(defaultVal).forEach(function (key) {
        _[key] = typeof _[key] !== "undefined" ? _[key] : defaultVal[key];
      });

      return _;
    };
  };
});