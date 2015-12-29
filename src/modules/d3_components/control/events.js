define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');
  var updateListeners = require('src/modules/d3_components/utils/updateListeners');
  var filterListeners = require('src/modules/d3_components/utils/filterListeners');
  var removeAllListeners = require('src/modules/d3_components/utils/removeAllListeners');
  var sumListeners = require('src/modules/d3_components/utils/sumListeners');

  // Adds event listeners to DOM elements
  return function events() {
    var processor = function (e) { return e; };
    var listeners = {};
    var svg;

    function control(selection) {
      selection.each(function () {
        svg = d3.select(this);
        updateListeners(svg, listeners, processor);
      });
    }

    // Public API

    /**
     * Function that defines how the d3.events object should be processed in
     * order to return the appropriate response data
     *
     * @param v {Function}
     * @returns {control}
     */
    control.processor = function (v) {
      if (!arguments.length) { return processor; }
      processor = _.isFunction(v) ? v : processor;
      return control;
    };

    /**
     * Adds event listeners to chart(s).
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @param listener {Function} - Listener for specified event type
     * @returns {control}
     */
    control.on = function (event, listener) {
      if (listener && _.isFunction(listener)) {
        if (!listeners[event]) { listeners[event] = []; }
        listeners[event].push(listener);

        if (svg) { svg.on(event, listener); }
      }
      return control;
    };

    /**
     * Removes event listeners from chart(s).
     * e.g. chart.off('click') => Removes all click listeners
     * e.g. chart.off('click', clickFunction) => Removes clickFunction
     * from click event listeners array.
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @param listener {Function} - Callback function for specified event type
     * @returns {control}
     */
    control.off = function (event, listener) {
      if (!listeners[event]) { return; }

      if (!listener) {
        delete listeners[event];
        if (svg) { svg.on(event, null); }
      }

      if (listener && _.isFunction(listener)) {
        filterListeners(event, listener, listeners);

        if (svg) { updateListeners(svg, listeners, processor); }
      }
      return control;
    };

    /**
     * Removes all event listeners from chart(s),
     * and resets the listeners object.
     *
     * @returns {control}
     */
    control.removeAllListeners = function () {
      removeAllListeners(svg, listeners);
      listeners = {}; // Reset listeners
      return control;
    };

    /**
     * Returns the listeners array for a specified event type.
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @returns {Array}
     */
    control.listeners = function (event) {
      return listeners[event] || [];
    };

    /**
     * Returns the listeners count for a specified event type
     * or the total listeners count.
     *
     * @param {String} [event] - DOM event, e.g. 'click'
     * @returns {Number}
     */
    control.listenerCount = function (event) {
      if (!arguments.length) { return sumListeners(listeners); }
      return event && listeners[event] ? _.size(listeners[event]) : 0;
    };

    /**
     * Returns an array of event types with active listeners.
     *
     * @returns {Array}
     */
    control.activeEvents = function () {
      return _.filter(_.keys(listeners), function (key) {
        return _.size(listeners[key]);
      });
    };

    return control;
  };
});
