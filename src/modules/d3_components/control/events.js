define(function (require) {
  var d3 = require('d3');

  // Adds event listeners to DOM elements
  return function events() {
    var processor = function (e) { return e; };
    var listeners = {};
    var svg;

    function control(selection) {
      selection.each(function () {
        svg = d3.select(this);
        updateListeners(svg, listeners);
      });
    }

    function updateListeners(svg, listeners) {
      d3.entries(listeners).forEach(function (d) {
        if (svg) {
          if (!d.value || !d.value.length) {
            svg.on(d.key, null);
          }

          svg.on(d.key, function () {
            d3.event.stopPropagation(); // => event.stopPropagation()

            d.value.forEach(function (listener) {
              listener.call(this, processor(d3.event));
            });
          });
        }
      });
    }

    function filterListeners(event, listener) {
      listeners[event] = listeners[event].filter(function (handler) {
        return handler !== listener;
      });
    }

    function removeAllListeners(svg, listeners) {
      d3.entries(listeners).forEach(function (d) {
        if (svg) svg.on(d.key, null);
      });
    }

    function sumListeners(listeners) {
      return Object.keys(listeners).map(function (event) {
          return listeners[event].length;
        })
        .reduce(function (a, b) {
          return a + b;
        }, 0);
    }

    // Public API

    /**
     * Function that defines how the d3.events object should be processed in
     * order to return the appropriate response data
     *
     * @param _ {Function}
     * @returns {control}
     */
    control.processor = function (_) {
      if (!arguments.length) return processor;
      processor = typeof _ === 'function' ? _ : processor;
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
      if (listener && typeof listener === 'function') {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(listener);

        if (svg) svg.on(event, listener);
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
      if (!listeners[event]) return;

      if (!listener) {
        delete listeners[event];
        if (svg) svg.on(event, null);
      }

      if (listener && typeof listener === 'function') {
        filterListeners(event, listener);

        if (svg) updateListeners(svg, listeners);
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
      return listeners[event] ? listeners[event] : [];
    };

    /**
     * Returns the listeners count for a specified event type
     * or the total listeners count.
     *
     * @param {String} [event] - DOM event, e.g. 'click'
     * @returns {Number}
     */
    control.listenerCount = function (event) {
      if (!arguments.length) return sumListeners(listeners);
      return event && listeners[event] ? listeners[event].length : 0;
    };

    /**
     * Returns an array of event types with active listeners.
     *
     * @returns {Array}
     */
    control.activeEvents = function () {
      return Object.keys(listeners).filter(function (event) {
        return listeners[event].length;
      });
    };

    return control;
  };
});
