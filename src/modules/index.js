define(function (require) {
  var d3 = require('d3');
  var mixed = require('src/modules/d3_components/mixed/chart');
  var layout = require('src/modules/d3_components/generator/layout');
  var control = require('src/modules/d3_components/control/events');

  /**
   * [phx description]
   * @param  {[type]} $el [description]
   * @return {[type]}     [description]
   */
  return function phx() {
    var chart = mixed();
    var base = layout();
    var events = control();
    var el;
    var selection;
    var datum = [];
    var opts = {};
    var wrapper = {};

    function evaluate() {
      if (!selection || selection.empty()) {
        throw new Error('A valid reference to a DOM element is required');
      }

      if ((!datum && !datum.length) || !selection.datum()) {
        throw new Error('No data provided');
      }

      if (!opts) {
        throw new Error('No options given');
      }
    }

    function validateSize(arr) {
      var width = arr[0];
      var height = arr[1];

      if (width <= 0 || height <= 0) {
        throw new Error('Unable to render chart(s), the parent DOM element has no' +
          'width ' + width + ' and/or height ' + height);
      }

      return arr;
    }

    function isArrayOfObjects(arr) {
      return arr.every(function (obj) {
        return obj instanceof Object;
      });
    }

    // Prepare phx function for garbage collection
    function reset() {
      chart = mixed();
      base = layout();
      events = control();
      el = undefined;
      selection = undefined;
      datum = [];
      opts = {};
    }

    // Public API

    /**
     * Creates a d3 selection for chart(s) placement,
     * or returns the current selected element.
     *
     * @param v {HTMLElement} - Reference to DOM element
     * @returns {*}
     */
    wrapper.element = function (v) {
      if (!arguments.length) { return el; }

      // TODO: Figure out a way to throw an error is $('cssSelector') is passed
      if (!(v instanceof HTMLElement) && !(v instanceof String) &&
          !(v instanceof d3.selection) && d3.select(v).empty()) {
        throw new Error('phx.element expects a valid reference to a DOM element.');
      }

      el = v instanceof d3.selection ? v : d3.select(v);
      selection = el.append('svg').attr('class', 'parent');

      if (datum && datum.length) { wrapper.data(datum); } // Bind data
      return wrapper;
    };

    /**
     * Binds data to the d3 selection,
     * or returns the bound data array.
     *
     * @param v {Object | Array} - Single object or Array of objects
     * @returns {*}
     */
    wrapper.data = function (v) {
      v = (!Array.isArray(v)) ? [v] : v;

      if (!arguments.length) { return datum; }

      if (!isArrayOfObjects(v)) {
        throw new Error('phx.data expects an object or an array of objects');
      }

      datum = v;
      if (selection) { selection.datum(datum); } // Bind data
      return wrapper;
    };

    /**
     * Sets the chart options
     *
     * @param v
     * @returns {*}
     */
    wrapper.options = function (v) {
      if (!arguments.length) { return opts; }

      if (!(v instanceof Object) || Array.isArray(v)) {
        throw new Error('phx.options expects a valid object');
      }

      opts = v;
      return wrapper;
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
      return wrapper;
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
     * @param width {Number} - Specifies width of DOM element
     * @param height {Number} - Specifies height of DOM element
     * @returns {wrapper}
     */
    wrapper.draw = function (width, height) {
      var node, size;

      evaluate();
      node = selection.node().parentNode;
      width = width || node.clientWidth;
      height = height || node.clientHeight;
      size = validateSize([width, height]);

      base.layout({
        type: opts.layout || 'grid',
        columns: opts.numberOfColumns || 0,
        size: size
      });

      selection.attr('width', size[0])
        .attr('height', size[1])
        .call(events) // Add event listeners to svg
        .call(base) // Create layout of g elements
        .selectAll('g.chart')
        .call(chart.options(opts)); // Draw chart(s)

      return wrapper;
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
      return wrapper;
    };

    /**
     * Removes chart(s) from the selected DOM element,
     * and prepares the chart object for garbage collection.
     *
     * @returns {wrapper}
     */
    wrapper.destroy = function () {
      events.removeAllListeners();
      selection.remove();
      reset();
      return wrapper;
    };

    /**
     * Adds event listeners to chart(s).
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @param listener {Function} - Listener for specified event type
     * @returns {wrapper}
     */
    wrapper.on = function (event, listener) {
      events.on(event, listener);
      return wrapper;
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
      events.off(event, listener);
      return wrapper;
    };

    /**
     * Removes all event listeners from chart(s),
     * and resets the listeners object.
     *
     * @returns {wrapper}
     */
    wrapper.removeAllListeners = function () {
      events.removeAllListeners();
      return wrapper;
    };

    /**
     * Returns the listeners array for a specified event type.
     *
     * @param event {String} - DOM event, e.g. 'click'
     * @returns {Array}
     */
    wrapper.listeners = events.listeners;

    /**
     * Returns the listeners count for a specified event type
     * or the total listeners count.
     *
     * @param {String} [event] - DOM event, e.g. 'click'
     * @returns {Number}
     */
    wrapper.listenerCount = events.listenerCount;

    /**
     * Returns an array of event types with active listeners.
     *
     * @returns {Array}
     */
    wrapper.activeEvents = events.activeEvents;

    return wrapper;
  };
});
