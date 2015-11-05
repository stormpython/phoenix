define(function (require) {
  var d3 = require('d3');

  return function builder(obj, func) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('builder expects a javascript Object ({}) as its first argument');
    }

    if (typeof func !== 'function') {
      throw new Error('builder expects a function as its second argument');
    }

    d3.entries(obj).forEach(function (d) {
      if (typeof func[d.key] === 'function') {
        func[d.key](d.value);
      }
    });

    return func;
  };
});