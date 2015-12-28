define(function (require) {
  var _ = require('lodash');

  return function isArrayOfObjects(arr) {
    return _.all(arr, _.isObject);
  };
});
