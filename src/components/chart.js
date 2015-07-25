define(function (require) {
  var jee = require("jubilee");
  var defaultOptions = require("options");

  return function chart() {
    var opts = null;
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var div = d3.select(this);
        var type = data.options.type || opts.type || "bar";
        var defaults = defaultOptions[type];
        var values = data.options.accessor || opts.accessor || getValues;
        var chart = jee.chart[type]()
          .width(data.width)
          .height(data.height)
          .listeners(listeners);

        Object.keys(defaults).forEach(function (attr) {
          var transFunc = defaults[attr];
          var chartFunc = chart[attr];

          if (data.options && data.options[attr]) {
            setAttr(transFunc, chartFunc, data.options[attr]);
          } else if (opts && opts[attr]) {
            setAttr(transFunc, chartFunc, opts[attr]);
          } else {
            setAttr(transFunc, chartFunc);
          }
        });

        div.datum(values).call(chart); // Draw Chart
      });
    }

    function getValues(d) {
      return d.data;
    }

    function setAttr(transFunc, chartFunc, attrVal) {
      if (transFunc) {
        var val = attrVal ? transFunc(attrVal) : transFunc();
        chartFunc(val);
      }
    }

    component.options = function (_) {
      if (!arguments.length) return opts;
      opts = _;
      return component;
    };

    component.listeners = function (_) {
      if (!arguments.length) return listeners;
      listeners = _;
      return component;
    };

    component.on = function (event, listener) {
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[event]) { listeners[event] = []; }
        listeners[event].push(listener);
      }
      return component;
    };

    component.off = function (event, listener) {
      if (arguments.length === 1 && listeners[event]) {
        listeners[event] = null;
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[event]) return;

        listeners[event] = listeners[event].filter(function (handler) {
          return handler !== listener;
        });
      }
      return component;
    };

    return component;
  };
});