define(function (require) {
  var _ = require('lodash');

  return function reduceCollectionOfArrayLengths(collection, func) {
    return _(collection).values().map(_.size).reduce(func);
  };
});
