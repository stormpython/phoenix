define(function (require) {
  var _ = require('lodash');

  return function isNumAndGreaterThan(value) {
    return function (num) {
      return _.isNumber(num) && _.gt(num, value);
    };
  };
});
