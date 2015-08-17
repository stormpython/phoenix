define(function (require) {
  require("jubilee"); // Includes D3
  // API functions
  var objectAPI = require("src/components/translations/api/object");
  var valueAPI = require("src/components/translations/api/value");
  var stringAPI = require("src/components/translations/api/string");
  var functionAPI = require("src/components/translations/api/function");

  // Defaults
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
    margin: objectAPI(margin),
    x: valueAPI("x"),
    y: valueAPI("y"),
    defined: functionAPI(defined),
    interpolate: stringAPI("linear"),
    color: functionAPI(d3.scale.category10()),
    xScale: objectAPI(scale),
    yScale: objectAPI(scale),
    xAxis: objectAPI(xAxis),
    yAxis: objectAPI(yAxis),
    stack: objectAPI(stack),
    clipPath: objectAPI(clipPath),
    area: objectAPI(area),
    lines: objectAPI(lines),
    zeroLine: objectAPI(zeroLine)
  };
});