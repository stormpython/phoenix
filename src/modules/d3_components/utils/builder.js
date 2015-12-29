define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

  /**
   * [builder Sets values for the object onto the closure function.]
   * @param  {[Object|{}]} obj  [plain javascript object]
   * @param  {[Function]} func [closure function]
   * @return {[Function]}      [closure function]
   */
  return function builder(obj, func) {
    if (!_.isPlainObject(obj)) {
      throw new Error('builder expects a javascript Object ({}) as its first argument');
    }

    if (!_.isFunction(func)) {
      throw new Error('builder expects a function as its second argument');
    }

    d3.entries(obj).forEach(function (d) {
      if (_.isFunction(func[d.key])) {
        func[d.key](d.value);
      }
    });

    return func;
  };
});
