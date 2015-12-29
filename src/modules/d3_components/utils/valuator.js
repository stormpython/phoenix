define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

  /**
   * [valuator Returns a function that returns the argument or an object key.
   * If argument is a function, returns the function.]
   * @param  {[String|Number|Function]} val [accessor function or key from an object to be returned]
   * @return {[Function]}     [accessor function]
   */
  return function valuator(val) {
    if (_.isFunction(val)) { return val; }
    if (_.isString(val) || _.isNumber(val)) {
      return function (d) { return d[val]; };
    }
    return d3.functor(val);
  };
});
