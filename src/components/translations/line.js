define(function (require) {
  require("jubilee"); // Includes D3
  // API functions
  var functionAPI = require("src/components/translations/api/function");
  var numberAPI = require("src/components/translations/api/number");
  var objectAPI = require("src/components/translations/api/object");
  var stringAPI = require("src/components/translations/api/string");
  var valueAPI = require("src/components/translations/api/value");

  // Defaults
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
    stroke: function (d, i) { return i; },
    strokeWidth: 3,
    opacity: 1,
    tension:  0.7
  };
  var circles = {
    show: false,
    groupClass: "circle layer",
    circleClass: "circle",
    fill: function (d, i, j) { return j; },
    stroke: null,
    radius: 5,
    strokeWidth: 3
  };

  return {
    margin: objectAPI(margin),
    x: valueAPI("x"),
    y: valueAPI("y"),
    defined: functionAPI(defined),
    interpolate: stringAPI("linear"),
    tension: numberAPI(0.7),
    color: functionAPI(d3.scale.category10()),
    xScale: objectAPI(scale),
    yScale: objectAPI(scale),
    xAxis: objectAPI(xAxis),
    yAxis: objectAPI(yAxis),
    clipPath: objectAPI(clipPath),
    zeroLine: objectAPI(zeroLine),
    lines: objectAPI(lines),
    circles: objectAPI(circles)
  };
});