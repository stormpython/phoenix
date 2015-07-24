define(function (require) {
  require("jubilee"); // contains d3
  var draw = require("components/draw");
  var setEventListener = require("components/set_event_listener");
  var sumListeners = require("components/sum_listeners");

  /**
   * D3 Charting Library wrapper
   *
   * @param {HTMLElement} el - Reference to DOM element
   * @returns {Phx}
   * @constructor
   */
  function Phx(el) {
    if (!(this instanceof Phx)) return new Phx(el);

    this._listeners = {};
    this.element(el);
    this.chart = null;
  }

  /**
   * Creates a d3 selection for chart(s) placement,
   * or returns the current selected element.
   *
   * @param {HTMLElement} [el] - Reference to DOM element
   * @returns {*}
   */
  Phx.prototype.element = function (el) {
    if (!arguments.length) return this.el; // => Getter
    if (!(el instanceof HTMLElement) && !(el instanceof String) ||
      !(d3.select(el).node())) {
      throw new Error("A valid element is required");
    }

    this.el = el; // => Setter
    this.selection = d3.select(el); // Create d3 selection
  };

  /**
   * Binds data to the d3 selection,
   * or returns the bound data array.
   *
   * @param {Array} [data] - Array of objects
   * @returns {Function|*}
   */
  Phx.prototype.data = function (data) {
    if (!arguments.length) return this.data; // => Getter
    if (!(data instanceof Array)) {
      throw new Error("The data method expects an array as input");
    }
    if (!this.selection) throw new Error("A valid element is required");

    this.data = data; // => Setter
    this.selection.datum(this.data); // Bind data
  };

  /**
   * Sets the options object, or returns the current options.
   *
   * @param {Object} [opts] - Chart options
   * @returns {*}
   */
  Phx.prototype.options = function (opts) {
    if (!arguments.length) return this.opts; // => Getter
    if (!(opts instanceof Object)) {
      throw new Error("The options method expects a valid object");
    }

    this.opts = opts; // => Setter
  };

  /**
   * Sets value for an options attribute.
   *
   * @param {String} name - Options attribute
   * @param {*} value - Value for options attribute
   */
  Phx.prototype.set = function (name, value) {
    this.opts[name] = value;
    this.draw();
  };

  /**
   * Returns an options object attribute.
   *
   * @param {String} name - Options attribute
   * @returns {*}
   */
  Phx.prototype.get = function (name) {
    return this.opts[name];
  };

  /**
   * Draws the chart(s).
   *
   * @param {Function|Number} [width] - Specifies width of DOM element
   * @param {Function|Number} [height] - Specifies height of DOM element
   * @returns {*}
   */
  Phx.prototype.draw = draw(this);

  /**
   * Resizes the chart(s).
   *
   * @param {Function|Number} [width] - Specifies width of DOM element
   * @param {Function|Number} [height] - Specifies height of DOM element
   * @returns {*}
   */
  Phx.prototype.resize = draw(this);

  /**
   * Removes (erases) chart(s) from the selected DOM element.
   */
  Phx.prototype.remove = function () {
    if (this.el) d3.select(this.el).selectAll("*").remove();
  };

  /**
   * Removes chart(s) from the selected DOM element,
   * and prepares the chart object for garbage collection.
   */
  Phx.prototype.destroy = function () {
    this.remove();
    this.el = null;
    this.data = null;
    this.opts = null;
    this.selection.datum(null);
    this.selection = null;
  };

  /**
   * Adds event listeners to chart(s).
   *
   * @param {String} event - DOM event, e.g. 'click'
   * @param {Function} listener - Listener for specified event type
   * @returns {*}
   */
  Phx.prototype.on = setEventListener("on", this);

  /**
   * Removes event listeners from chart(s).
   * e.g. chart.off("click") => Removes all click listeners
   * e.g. chart.off("click", clickFunction) => Removes clickFunction
   * from click event listeners array.
   *
   * @param {String} event - DOM event, e.g. 'click'
   * @param {Function} [listener] - Listener for specified event type
   * @returns {*}
   */
  Phx.prototype.off = setEventListener("off", this);

  /**
   * Removes all event listeners from chart(s),
   * and resets the listeners object.
   */
  Phx.prototype.removeAllListeners = function () {
    var self = this;
    var listeners = self._listeners;

    if (!self.selection) throw new Error ("...");
    if (!self.chart) throw new Error("...");

    if (listeners && typeof listeners === "object") {
      Object.keys(listeners).forEach(function (event) {
        self.remove();
        self.selection.call(self.chart.off(event)); // remove listeners
      });
    }
    listeners = {}; // Reset listeners object
    self.remove();
    self.selection.call(self.chart.listeners(listeners));
  };

  /**
   * Returns the listeners array for a specified event type,
   * e.g. "click".
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
    var listeners = this._listeners;
    var listenersKeyLength = Object.keys(listeners).length;

    if (!arguments.length) return sumListeners(this._listeners);
    if (!listenersKeyLength) return 0;
    if (event && listeners[event]) return listeners[event].length;
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
