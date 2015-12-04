define(function (require) {
  var d3 = require('d3');
  var chart = require('src/modules/d3_components/mixed/chart');
  var layout = require('src/modules/d3_components/generator/layout');
  var events = require('src/modules/d3_components/control/events');
  var sumListeners = require('src/modules/helpers/sum_listeners');
  var validateSize = require('src/modules/helpers/validate_size');

  /**
   * D3 Charting Library wrapper
   *
   * @param {HTMLElement} el - Reference to DOM element
   */
  return function phx(el) {
    var chart = chart();
    var base = layout();
    var events = events();
    var el = el ? wrapper.element(el) : null;
    var selection = null;
    var datum = [];
    var opts = {};
    var listeners = {};

    function wrapper() {}

    function evaluate(args) {
      if (args.selection) {
        if (!selection || !selection.node()) {
          throw new Error('A valid reference to a DOM element is required');
        }
      }

      if (args.datum) {
        if (!datum && !datum.length || !selection.datum()) {
          throw new Error('No data provided');
        }
      }

      if (args.opts) {
        if (!opts) throw new Error('No options given');
      }
    }

    // Prepare phx function for garbage collection
    function destroy() {
      chart = null;
      base = null;
      events = null;
      el = null;
      selection = null;
      datum = [];
      opts = {};
      listeners = {};
    }

    function filterListeners(event) {
      listeners[event] = listeners[event].filter(function (handler) {
        return handler !== listener;
      });
      // Update events
      selection.call(events.listeners(listeners));
    }

    function removeEvents(event) {
      Object.keys(listeners).forEach(function (e) {
        if (!event || event && event === e) {
          selection.on(event, null);
          delete listeners[event];
        }
      });
      removeBrush(event);
    }

    function removeBrush(event) {
      if (event && !isBrushEvent(event)) return;

      var domEvents = getEvents(event);

      selection.selectAll('g.brush').each(function () {
        var g = d3.select(this);

        domEvents.forEach(function (e) {
          g.on(e, null);
        });

        if (!event || isBrushEmpty(listeners)) g.remove();
      });
    }

    function isBrushEvent(event) {
      var brushEvents = ['brush', 'brushstart', 'brushend'];
      return !event || (event && brushEvents.indexOf(event) !== -1) ? true : false;
    }

    function getEvents(event) {
      var eventsMap = {
        brushstart: ['mousedown.brush', 'touchstart.brush'],
        brush: ['mousemove.brush', 'touchmove.brush'],
        brushend: ['mouseup.brush', 'touchend.brush']
      };

      return !event ? concatEventsMap(eventsMap) : eventsMap[event];
    }

    function concatEventsMap(map) {
      return Object.keys(map)
        .map(function (event) { return map[event]; })
        .reduce(function (a, b) { return a.concat(b); }, []);
    }

    function isBrushEmpty(listeners) {
      return ['brush', 'brushstart', 'brushend'].every(function (event) {
        return !listeners[event] || !listeners[event].length;
      });
    }


    // Public API

    /**
     * Creates a d3 selection for chart(s) placement,
     * or returns the current selected element.
     *
     * @param _ {HTMLElement} - Reference to DOM element
     * @returns {*}
     */
    wrapper.element = function (_) {
      if (!arguments.length) return el;

      if (!(_ instanceof HTMLElement) && !(_ instanceof String) &&
        !(_ instanceof d3.selection) && !(d3.select(_).node())) {
        throw new Error('phx.element expects a valid reference to a DOM element.');
      }

      el = _ instanceof d3.selection ? _ : d3.select(_);
      selection = el.append('svg').attr('class', 'parent');

      if (datum && datum.length) this.data(datum); // Bind data
      return this;
    };

    /**
     * Binds data to the d3 selection,
     * or returns the bound data array.
     *
     * @param _ {Object | Array} - Single object or Array of objects
     * @returns {*}
     */
    wrapper.data = function (_) {
      if (!arguments.length) return datum;

      if (!(_ instanceof Object)) {
        throw new Error('phx.data expects an object or array');
      }

      // Allow for single chart objects to be passed in directly.
      _ = (!Array.isArray(_)) ? [_] : _;
      _.every(function (obj) {
        if (!(obj instanceof Object)) {
          throw new Error('phx.data expects an array of objects');
        }
      });

      datum = _;
      if (selection) selection.datum(datum); // Bind data
      return this;
    };

    /**
     * Sets the chart options
     *
     * @param _
     * @returns {*}
     */
    wrapper.options = function (_) {
      if (!arguments.length) return opts;

      if (!(_ instanceof Object) || Array.isArray(_)) {
        throw new Error('phx.options expects a valid object');
      }

      opts = _;
      return this;
    };

    /**
     * Sets value for an options attribute.
     *
     * @param name {String} - Options attribute
     * @param value {*} - Value for options attribute
     * @returns {wrapper}
     */
    wrapper.set = function (name, value) {
      opts[name] = value;
      return this;
    };

    /**
     * Returns an options object attribute.
     *
     * @param {String} name - Options attribute
     * @returns {*}
     */
    wrapper.get = function (name) {
      return opts[name];
    };

    /**
     * Draws the chart(s).
     *
     * @param width {Function|Number} - Specifies width of DOM element
     * @param height {Function|Number} - Specifies height of DOM element
     * @returns {wrapper}
     */
    wrapper.draw = function (width, height) {
      evaluate({ selection: selection, datum: datum, opts: opts });

      var node = selection.node().parentNode;
      var size = validateSize([node.clientWidth, node.clientHeight]);

      base.layout(opts.layout || 'grid')
        .columns(opts.numberOfColumns || 0)
        .size(size);

      chart.options(opts).listeners(listeners);

      selection.attr('width', width || size[0])
        .attr('height', height || size[1])
        .call(events) // Add event listeners to svg
        .call(base) // Create layout of g elements
        .selectAll('g.chart')
        .call(chart); // Draw chart(s)

      return this;
    };

    /**
     * Resizes chart(s).
     *
     * @type {wrapper.draw|*}
     */
    wrapper.resize = wrapper.draw;

    /**
     * Detaches nodes from DOM, effectively removing
     * the chart(s). However this does not destroy charts.
     * It is only meant to clear the DOM nodes from the screen.
     * They still exist in memory. Use `destroy` to prepare
     * the chart object for GC.
     *
     * @returns {wrapper}
     */
    wrapper.remove = function () {
      selection.selectAll('g.chart').remove();
      return this;
    };

    /**
     * Removes chart(s) from the selected DOM element,
     * and prepares the chart object for garbage collection.
     *
     * @returns {wrapper}
     */
    wrapper.destroy = function () {
      this.removeAllListeners();
      selection.remove();
      selection.datum(null);
      destroy();
      return this;
    };

    /**
     * Adds event listeners to chart(s).
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @param listener {Function} - Listener for specified event type
     * @returns {wrapper}
     */
    wrapper.on = function (event, listener) {
      evaluate({ selection: selection }); // Validate selection

      if (listener && typeof listener === 'function') {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(listener);
      }
      // Attach listener(s)
      selection.call(events.listeners(listeners));
      return this;
    };

    /**
     * Removes event listeners from chart(s).
     * e.g. chart.off('click') => Removes all click listeners
     * e.g. chart.off('click', clickFunction) => Removes clickFunction
     * from click event listeners array.
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @param listener {Function} - Callback function for specified event type
     * @returns {wrapper}
     */
    wrapper.off = function (event, listener) {
      evaluate({ selection: selection }); // Validate selection

      if (listeners[event]) {
        if (!listener) removeEvents(event);
        if (listener && typeof listener === 'function') filterListeners(event);
      }

      return this;
    };

    /**
     * Removes all event listeners from chart(s),
     * and resets the listeners object.
     *
     * @returns {wrapper}
     */
    wrapper.removeAllListeners = function () {
      evaluate({ selection: selection });
      removeEvents();
      events.listeners(listeners = {}); // Reset listeners
      return this;
    };

    /**
     * Returns the listeners array for a specified event type.
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @returns {Array}
     */
    wrapper.listeners = function (event) {
      return listeners[event] ? listeners[event] : [];
    };

    /**
     * Returns the listeners count for a specified event type
     * or the total listeners count.
     *
     * @param {String} [event] - DOM event, e.g. 'click'
     * @returns {Number}
     */
    wrapper.listenerCount = function (event) {
      if (!arguments.length) return sumListeners(listeners);
      return event && listeners[event] ? listeners[event].length : 0;
    };

    /**
     * Returns an array of event types with active listeners.
     *
     * @returns {Array}
     */
    wrapper.activeEvents = function () {
      return Object.keys(listeners).filter(function (key) {
        return listeners[key].length;
      });
    };

    return wrapper;
  }
});
