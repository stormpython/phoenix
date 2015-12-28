define(function (require) {
  var _ = require('lodash');
  var hasSize = require('src/modules/d3_components/utils/hasSize');

  return function allHasSize(coll) {
    return _.all(coll, hasSize);
  };
})
