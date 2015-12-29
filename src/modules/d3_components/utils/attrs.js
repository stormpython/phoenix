define(function (require) {
  var builder = require('src/modules/d3_components/utils/builder');
  var _ = require('lodash');

  /**
   * [attrs description]
   * @param  {[type]} generator [description]
   * @return {[type]}           [description]
   */
  return function attrs(generator) {
    /**
     * [description]
     * @param {[Array]} arguments [array of functions]
     * @return {[Function]} [function that accepts an attr and value to set on a closure function]
     */
    return function () {
      var funcs = _.toArray(arguments);

      function filter(arr, attr) {
        return _.filter(arr, function (func) {
          return _.isFunction(func[attr]);
        });
      }

      function getValue(arr, attr) {
        if (!arr.length) { return; }

        if (arr.length === 1) { return arr[0][attr](); }

        return _.map(arr, function (func) {
          return func[attr]();
        });
      }

      /**
       * [attrs description]
       * @param  {[type]} attr  [description]
       * @param  {[type]} value [description]
       * @return {[type]}       [description]
       */
      return function (attr, value) {
        if (_.isString(attr)) {
          if (!value) {
            return getValue(filter(funcs, attr), attr);
          }

          _.forEach(filter(funcs, attr), function (func) {
            func[attr](value);
          });
        }

        if (!value && _.isPlainObject(attr)) {
          _.forEach(funcs, function (func) {
            builder(attr, func);
          });
        }

        return generator;
      };
    };
  };
});
