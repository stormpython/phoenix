define(function (require) {
  require("jubilee"); // Includes D3
  var margin = require("src/components/translations/defaults/margin");
  var defined = require("src/components/translations/defaults/defined");
  var scale = require("src/components/translations/defaults/scale");
  var xAxis = require("src/components/translations/defaults/x_axis");
  var yAxis = require("src/components/translations/defaults/y_axis");
  var clipPath = require("src/components/translations/defaults/clippath");
  var zeroLine = require("src/components/translations/defaults/zeroline");
  var lines = {
    groupClass: "paths",
    lineClass: "line",
    //stroke: function (d, i) { return color(i); },
    strokeWidth: 3,
    opacity: 1,
    interpolate: "linear",
    tension:  0.7
  };
  var circles = {
    show: true,
    groupClass: "circle layer",
    circleClass: "circle",
    //fill: function (d, i, j) { return color(j); },
    stroke: null,
    radius: 5,
    strokeWidth: 3
  };

  return {
    margin: require("src/components/translations/api/object")(margin),
    x: require("src/components/translations/api/value")("x"),
    y: require("src/components/translations/api/value")("y"),
    defined: require("src/components/translations/api/function")(defined),
    //interpolate: require("src/components/translations/api/string")("linear"),
    color: require("src/components/translations/api/function")(d3.scale.category10()),
    xScale: require("src/components/translations/api/object")(scale),
    yScale: require("src/components/translations/api/object")(scale),
    xAxis: require("src/components/translations/api/object")(xAxis),
    yAxis: require("src/components/translations/api/object")(yAxis),
    clipPath: require("src/components/translations/api/object")(clipPath),
    zeroLine: require("src/components/translations/api/object")(zeroLine),
    lines: require("src/components/translations/api/object")(lines),
    circles: require("src/components/translations/api/object")(circles)
  };
});