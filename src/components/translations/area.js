define(function (require) {
  require("jubilee"); // Includes D3
  var margin = require("src/components/translations/defaults/margin");
  var defined = require("src/components/translations/defaults/defined");
  var scale = require("src/components/translations/defaults/scale");
  var xAxis = require("src/components/translations/defaults/x_axis");
  var yAxis = require("src/components/translations/defaults/y_axis");
  var stack = require("src/components/translations/defaults/stack");
  var clipPath = require("src/components/translations/defaults/clippath");
  var zeroLine = require("src/components/translations/defaults/zeroline");
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

  return {
    margin: require("src/components/translations/api/object")(margin),
    x: require("src/components/translations/api/value")("x"),
    y: require("src/components/translations/api/value")("y"),
    defined: require("src/components/translations/api/function")(defined),
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
    zeroLine: require("src/components/translations/api/object")(zeroLine)
  };
});