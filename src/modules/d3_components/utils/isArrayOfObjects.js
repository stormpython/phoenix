define(function (require) {
  var _ = require('lodash');

  /**
   * [isArrayOfObjects Returns true if all items in object are objects.]
   * @param  {[Object/Array]} coll [Collection]
   * @return {Boolean}     [true if all items in collection are objects]
   */
  return function isArrayOfObjects(coll) {
    return _.all(coll, _.isObject);
  };
});
