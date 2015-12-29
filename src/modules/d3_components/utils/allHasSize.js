define(function (require) {
  var _ = require('lodash');
  var hasSize = require('src/modules/d3_components/utils/hasSize');

  /**
   * [allHasSize Returns true if all values in the collection have a value or
   * length greater than zero, else returns false.]
   * @param  {[Object/Array]} coll [Object/Array of data types]
   * @return {[Boolean]}      [true if all values are greater than zero, else false]
   */
  return function allHasSize(coll) {
    return _.all(coll, hasSize);
  };
})
