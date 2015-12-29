define(function (require) {
  var reduceCollectionOfArrayLengths = require('src/modules/d3_components/utils/reduceCollectionOfArrayLengths');

  function sum(total, n) {
    return total + n;
  }

  return function sumListeners(listeners) {
    return reduceCollectionOfArrayLengths(listeners, sum);
  };
});
