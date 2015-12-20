define(function (require) {
  var d3 = require('d3');

  return function attrs(func, generator) {
    return function (attr, value) {
      if (!value && attr instanceof String) { return func[attr](); }

      if (!value && attr instanceof Object) {
        d3.entries(attr).forEach(function (d) {
          if (typeof func[d.key] === 'function') {
            func[d.key](d.value);
          }
        });
      }

      if (value && attr instanceof String) { func[attr](value); }

      return generator;
    };
  };
});
