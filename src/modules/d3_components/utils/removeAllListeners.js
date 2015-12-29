define(function (require) {
  var _ = require('lodash');

  return function removeAllListeners(svg, listeners) {
    _.forEach(_.keys(listeners), function (key) {
      if (svg) {
        svg.on(key, null);
      }
    });
  };
});
