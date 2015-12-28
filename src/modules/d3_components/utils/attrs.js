define(function (require) {
  var builder = require('src/modules/d3_components/utils/builder');

  return function attrs(generator) {
    return function () {
      var funcs = Array.prototype.slice(arguments);

      function filter(arr, attr) {
        return arr.filter(function (func) {
          return func[attr] instanceof Function;
        });
      }

      function getValue(arr, attr) {
        if (!arr.length) { return; }

        if (arr.length === 1) { return arr[0][attr](); }

        return arr.map(function (func) {
          return func[attr]();
        });
      }

      return function (attr, value) {
        if (!value && attr instanceof String) {
          return getValue(filter(funcs, attr), attr);
        }

        if (value && attr instanceof String) {
          filter(funcs, attr).forEach(function (func) {
            func[attr](value);
          });
        }

        if (!value && attr instanceof Object) {
          funcs.forEach(function (func) {
            builder(attr, func);
          });
        }

        return generator;
      };
    };
  };
});
