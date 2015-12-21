define(function (require) {
  var builder = require('src/modules/d3_components/utils/builder');

  return function attrs(func, generator) {
    return function (attr, value) {
      if (!value && attr instanceof String) { return func[attr](); }

      if (!value && attr instanceof Object) { builder(attr, func); }

      if (value && attr instanceof String) { func[attr](value); }

      return generator;
    };
  };
});
