define(function (require) {
  require("jubilee"); // Includes D3

  var margin = {top: 20, right: 20, bottom: 50, left: 50};
  var definedFunc = function (d) { return !isNaN(d.x); };
  var scale = { scale: null, domain: null, nice: true, clamp: false };
  var xAxis = {
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
  var yAxis = {
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
  var stack = {
    offset: "zero",
    order: "default",
    out: function (d, y0, y) {
      d.y0 = y0;
      d.y = y;
    }
  };
  var clipPath = { width: null, height: null };
  var area = {
    groupClass: "paths",
    areaClass: "area",
    strokeWidth: 0,
    opacity: 1
  };
  var lines = {
    show: false,
    groupClass: "paths",
    lineClass: "line",
    strokeWidth: 3,
    opacity: 1,
    tension:  0.7
  };
  var zeroLine = {
    add: true,
    lineClass: "zero-line",
    stroke: "black",
    strokeWidth: 1,
    opacity: 0.5
  };

  return {
    margin: require("src/components/translations/api/object")(margin),
    x: require("src/components/translations/api/value")("x"),
    y: require("src/components/translations/api/value")("y"),
    defined: require("src/components/translations/api/function")(definedFunc),
    interpolate: require("src/components/translations/api/string")("linear"),
    color: require("src/components/translations/api/function")(d3.scale.category10()),
    xScale: require("src/components/translations/api/object")(scale),
    yScale: require("src/components/translations/api/object")(scale),
    xAxis: require("src/components/translations/api/object")(xAxis),
    yAxis: require("src/components/translations/api/object")(yAxis),
    stack: require("src/components/translations/api/object")(stack),
    clipPath: require("src/components/translations/api/object")(clipPath),
    area: require("src/components/translations/api/object")(area),
    lines: require("src/components/translations/api/object")(lines),
    zeroLine: require("src/components/translations/api/object")(zeroLine),
  };
});