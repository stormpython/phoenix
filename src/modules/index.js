define(function (require) {
  var d3 = require('d3');
  var chart = require('src/modules/d3_components/mixed/chart');
  var layout = require('src/modules/d3_components/generator/element/html/div');
  var sizeFunc = require('src/modules/helpers/size');
  var sumListeners = require('src/modules/helpers/sum_listeners');

  function evaluate(self) {
    if (!self._selection || !self._selection.node()) {
      throw new Error('A valid element is required');
    }
    if (!self._datum && !self._datum.length || !self._selection.datum()) {
      throw new Error('No data provided');
    }
    if (!self._opts) throw new Error('No options given');
  }

  function validateSize(arr) {
    var width = arr[0];
    var height = arr[1];

    if (width <= 0 || height <= 0) {
      throw new Error('Unable to render chart(s), the parent DOM element has no' +
        'width ' + width + ' and/or height ' + height);
    }
  }

  function removeBrush(selection) {
    var brushEvents = [
      'mousedown.brush', 'touchstart.brush',
      'mousemove.brush', 'mouseup.brush',
      'touchmove.brush', 'touchend.brush',
      'keydown.brush', 'keyup.brush'
    ];

    selection.selectAll('svg').each(function () {
      brushEvents.forEach(function (event) {
        d3.select(this).on(event, null);
      });
    });
  }

  function removeListeners(selection, event) {
    selection.selectAll('svg').each(function () {
      d3.select(this).on(event, null);
    });
  }

  /**
   * D3 Charting Library wrapper
   *
   * @param {HTMLElement} el - Reference to DOM element
   * @returns {Phx}
   * @constructor
   */
  function Phx(el) {
    if (!(this instanceof Phx)) return new Phx(el);

    this._chart = chart();
    this._layout = layout();
    this._listeners = {};
    this.element(el || null);
    this._datum = [];
    this._opts = {};
  }

  /**
   * Creates a d3 selection for chart(s) placement,
   * or returns the current selected element.
   *
   * @param {HTMLElement} [el] - Reference to DOM element
   * @returns {*}
   */
  Phx.prototype.element = function (el) {
    if (!arguments.length) return this._el; // => Getter
    if (!(el instanceof HTMLElement) && !(el instanceof String) &&
      !(el instanceof d3.selection) && !(d3.select(el).node())) {
      throw new Error('Phx requires a valid HTML element');
    }

    this._el = el; // => Setter
    // Create d3 selection
    this._selection = el instanceof d3.selection ? el : d3.select(el);
    // Bind datum to selection if datum exists
    if (this._datum) this.data(this._datum);
    return this;
  };

  /**
   * Binds data to the d3 selection,
   * or returns the bound data array.
   *
   * @param {Array} [datum] - Single object or Array of objects
   * @returns {*}
   */
  Phx.prototype.data = function (datum) {
    if (!arguments.length) return this._datum; // => Getter

    // Allow for a single chart objects to be passed in directly.
    if (typeof datum === 'object' && !Array.isArray(datum)) datum = [datum];

    datum.every(function (obj) {
      if (!(obj instanceof Object)) {
        throw new Error('data expects an array of objects');
      }
    });

    this._datum = datum; // => Setter
    this._selection.datum(this._datum); // Bind data
    return this;
  };

  /**
   * Sets the options object, or returns the current options.
   *
   * @param {Object} [opts] - Chart options
   * @returns {Phx}
   */
  Phx.prototype.options = function (opts) {
    if (!arguments.length) return this._opts; // => Getter
    if (!(opts instanceof Object) || Array.isArray(opts)) {
      throw new Error('The options method expects a valid object');
    }

    this._opts = opts; // => Setter
    return this;
  };

  /**
   * Sets value for an options attribute.
   *
   * @param {String} name - Options attribute
   * @param {*} value - Value for options attribute
   * @returns {Phx}
   */
  Phx.prototype.set = function (name, value) {
    this._opts[name] = value;
    return this;
  };

  /**
   * Returns an options object attribute.
   *
   * @param {String} name - Options attribute
   * @returns {*}
   */
  Phx.prototype.get = function (name) {
    return this._opts[name];
  };

  /**
   * Draws the chart(s).
   *
   * @param {Function|Number} [width] - Specifies width of DOM element
   * @param {Function|Number} [height] - Specifies height of DOM element
   * @returns {Phx}
   */
  Phx.prototype.draw = function (width, height) {
    var layout;
    var chart;
    var size;

    evaluate(this);
    layout = this._layout.layout(this._opts.layout || 'rows');
    chart = this._chart.options(this._opts);
    size = validateSize(sizeFunc(this._selection, width, height));

    this._selection.call(layout.size(size))
      .selectAll('.' + layout.class()).call(chart);
  };

  /**
   * Resizes the chart(s).
   *
   * @param {Function|Number} [width] - Specifies width of DOM element
   * @param {Function|Number} [height] - Specifies height of DOM element
   * @returns {Phx}
   */
  Phx.prototype.resize = Phx.prototype.draw;

  /**
   * Detaches nodes from DOM, effectively removing
   * the chart(s). However this does not destroy charts.
   * It is only meant to clear the nodes from the screen.
   * They still exist in memory. Use `destroy` to prepare
   * the chart object for GC.
   *
   * @returns {Phx}
   */
  Phx.prototype.remove = function () {
    this._selection.remove();
    return this;
  };

  /**
   * Removes chart(s) from the selected DOM element,
   * and prepares the chart object for garbage collection.
   *
   * @returns {Phx}
   */
  Phx.prototype.destroy = function () {
    this.removeAllListeners();
    this._selection.remove();
    this._selection.datum(null);
    this._selection = null;
    this._chart = null;
    this._layout = null;
    this._opts = null;
    this._datum = null;
    this._el = null;
    return this;
  };

  /**
   * Adds event listeners to chart(s).
   *
   * @param {String} event - DOM event, e.g. 'click'
   * @param {Function} listener - Listener for specified event type
   * @returns {Phx}
   */
  Phx.prototype.on = function (event, listener) {
    if (!this._selection) throw new Error('A valid element is required');
    this._chart.on(event, listener); // value => 'on' or 'off'
    this._listeners = this._chart.listeners(); // Redefine listeners
    return this;
  };

  /**
   * Removes event listeners from chart(s).
   * e.g. chart.off('click') => Removes all click listeners
   * e.g. chart.off('click', clickFunction) => Removes clickFunction
   * from click event listeners array.
   *
   * @param {String} event - DOM event, e.g. 'click'
   * @param {Function} [listener] - Listener for specified event type
   * @returns {Phx}
   */
  Phx.prototype.off = function (event, listener) {
    if (!this._selection) throw new Error('A valid element is required');
    if (this._listeners[event]) {
      if (!listener) {
        removeListeners(this._selection, event);
        delete this._listeners[event];
        this._chart.listeners(this._listeners);
      }
      if (event && listener) {
        this._chart.off(event, listener);
        this._listeners = this._chart.listeners();
      }
    }
    return this;
  };

  /**
   * Removes all event listeners from chart(s),
   * and resets the listeners object.
   *
   * @returns {Phx}
   */
  Phx.prototype.removeAllListeners = function () {
    var selection = this._selection;

    if (!selection) throw new Error('A valid element is required');

    removeBrush(selection);
    Object.keys(this._listeners).forEach(function (event) {
      removeListeners(selection, event);
    });

    this._chart.listeners(this._listeners = {});
    return this;
  };

  /**
   * Returns the listeners array for a specified event type,
   * e.g. 'click'.
   *
   * @param {String} event - DOM event, e.g. 'click'
   * @returns {Array}
   */
  Phx.prototype.listeners = function (event) {
    return this._listeners[event] ? this._listeners[event] : [];
  };

  /**
   * Returns the listeners count for a specified event type
   * or the total listeners count.
   *
   * @param {String} [event] - DOM event, e.g. 'click'
   * @returns {Number}
   */
  Phx.prototype.listenerCount = function (event) {
    if (!arguments.length) return sumListeners(this._listeners);
    if (event && this._listeners[event]) return this._listeners[event].length;
    return 0;
  };

  /**
   * Returns an array of event types with active listeners.
   *
   * @returns {Array}
   */
  Phx.prototype.activeEvents = function () {
    var listeners = this._listeners;

    return Object.keys(listeners).filter(function (key) {
      return listeners[key].length;
    });
  };

  return Phx;
});
