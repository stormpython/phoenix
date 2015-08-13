define(function (require) {
  var jee = require("jubilee");
  var chartOptions = require("src/components/chart_options");

  return function chart() {
    var opts = {};
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var div = d3.select(this);
        var type = data.options && data.options.type || opts.type || "bar";
        var defaults = chartOptions[type];
        var accessor = data && data.options && data.options.accessor
          || opts.accessor;
        var values = setAccessor(accessor) || getValues;
        var chart = jee.chart[type]()
          .width(data.width)
          .height(data.height)
          .listeners(listeners);

        Object.keys(defaults).forEach(function (attr) {
          var defaultFunc = defaults[attr];
          var chartFunc = chart[attr];

          if (data && data.options && data.options[attr]) {
            setAttr(defaultFunc, chartFunc, data.options[attr]);
          } else if (opts && opts[attr]) {
            setAttr(defaultFunc, chartFunc, opts[attr]);
          } else {
            setAttr(defaultFunc, chartFunc);
          }
        });

        div.call(chart.accessor(values)); // Draw Chart
      });
    }

    function getValues(d) {
      return d.data;
    }

    function setAccessor(val) {
      if (val) return function (d) { return d[val]; };
    }

    function setAttr(defaultFunc, chartFunc, attrVal) {
      if (defaultFunc) {
        var val = attrVal ? defaultFunc(attrVal) : defaultFunc();
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
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(listener);
      }
      return component;
    };

    component.off = function (event, listener) {
      if (arguments.length === 1 && listeners[event]) {
        listeners[event] = null;
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter(function (handler) {
            return handler !== listener;
          });
        }
      }
      return component;
    };

    return component;
  };
});