define(function (require) {
  require("jubilee");

  return {
    margin: function (_) {
      var defaults = {top: 20, right: 20, bottom: 50, left: 50};

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");

      _.top = typeof _.top !== "undefined" ? _.top : defaults.top;
      _.right = typeof _.right !== "undefined" ? _.right : defaults.right;
      _.bottom = typeof _.bottom !== "undefined" ? _.bottom : defaults.bottom;
      _.left = typeof _.left !== "undefined" ? _.left : defaults.left;
      return _;
    },
    x: function (_) {
      if (!arguments.length) return function (d) { return d.x; };
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    },
    y: function (_) {
      if (!arguments.length) return function (d) { return d.y; };
      if (typeof _ !== "string") throw new Error("A string is expected");
      return function (d) { return d[_]; };
    },
    defined: function (_) {
      if (!arguments.length) return function (d) { return !isNaN(d.x); };
      if (typeof _ !== "boolean") throw new Error("A boolean is expected");
      return _;
    },
    interpolate: function (_) {
      if (!arguments.length) return "linear";
      if (typeof _ !== "string") throw new Error("A string is expected");
      return _;
    },
    zeroLine: function (_) {
      if (!arguments.length) return true;
      if (typeof _ !== "boolean") throw new Error("A boolean is expected");
      return _;
    },
    color: function (_) {
      if (!arguments.length) return d3.scale.category10();
      if (typeof _ !== "function") throw new Error("A function is expected");
      return _;
    },
    xScale: function (_) {
      var defaults = {scale:null, domain:null, nice: true, clamp: false};
      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    yScale: function (_) {
      var defaults = {scale:null, domain:null, nice: true, clamp: false};
      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    xAxis: function (_) {
      var xAxisDefaults = {
        show: true,
        gClass: "x axis",
        tick: {
          number: 10, values: null, size: 6, padding: 3,
          format: null, rotate: 0, innerTickSize: 6, outerTickSize: 6,
          text: {anchor: "middle", x: 0, y: 9, dx: "", dy: ".71em"}
        },
        title: {
          titleClass: "axis title", x: 6, y: 6, dx: "",
          dy: ".71em", anchor: "middle", text: ""
        }
      };

      if (!arguments.length) return xAxisDefaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    yAxis: function (_) {
      var defaults = {
        show: true,
        gClass: "y axis",
        transform: "translate(0,0)",
        tick: {
          number: 10, values: null, size: 6, padding: 3, format: null,
          rotate: 0, innerTickSize: 6, outerTickSize: 6,
          text: {anchor: "end", x: -9, y: 0, dx: "", dy: ".32em"}
        },
        title: {
          titleClass: "axis title", x: 0, y: -40, dx: "", dy: ".71em",
          anchor: "middle", rotate: 270, transform: "translate(0,0)", text: ""
        }
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    stack: function (_) {
      var defaults = {
        offset: "zero",
        order: "default",
        out: function (d, y0, y) {
          d.y0 = y0;
          d.y = y;
        }
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    clipPath: function (_) {
      var defaults = {
        width: null,
        height: null
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    area: function (_) {
      var defaults = {
        groupClass: "paths",
        areaClass: "area",
        strokeWidth: 0,
        opacity: 1
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    lines: function (_) {
      var defaults = {
        show: false,
        groupClass: "paths",
        lineClass: "line",
        strokeWidth: 3,
        opacity: 1,
        tension:  0.7
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    },
    zeroLine: function (_) {
      var defaults = {
        add: true,
        lineClass: "zero-line",
        stroke: "black",
        strokeWidth: 1,
        opacity: 0.5
      };

      if (!arguments.length) return defaults;
      if (typeof _ !== "object") throw new Error("An object is expected");
      return _;
    }
  };
});