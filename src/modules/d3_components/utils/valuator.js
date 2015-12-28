define(function (require) {
  var d3 = require('d3');

  /**
   * [Wrapper function that returns a function
   * that returns the argument or an object key.
   * If argument is a function, returns the function.]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  return function (val) {
    if (typeof val === 'function') { return val; }
    if (typeof val === 'string' || typeof val === 'number') {
      return function (d) { return d[val]; };
    }
    return d3.functor(val);
  };
});
