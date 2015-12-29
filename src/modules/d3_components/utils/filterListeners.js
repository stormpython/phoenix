define(function (require) {
  var _ = require('lodash');

  return function filterListeners(event, listener, listeners) {
    listeners[event] = _.filter(listeners[event], function (handler) {
      return handler !== listener;
    });
  };
});
