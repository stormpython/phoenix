define(function (require) {
  var _ = require('lodash');

  function isGreaterThanZero(value) {
    return _.gt(value, 0);
  }

  return function hasSize(value) {
    if (_.isNumber(value)) {
      return isGreaterThanZero(value);
    }

    if (_.isString(value)) {
      return isGreaterThanZero(_.size(value));
    }

    if (_.isObject(value)) {
      return isGreaterThanZero(_.size(_.toArray(value)));
    }

    return false;
  };
});
