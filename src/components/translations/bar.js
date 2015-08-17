define(function (require) {
  require("jubilee"); // Includes D3
  // API functions
  var booleanAPI = require("src/components/translations/api/boolean");
  var functionAPI = require("src/components/translations/api/function");
  var objectAPI = require("src/components/translations/api/object");
  var valueAPI = require("src/components/translations/api/value");

  // Defaults
  var margin = require("src/components/translations/defaults/margin");
  var scale = require("src/components/translations/defaults/scale");
  var xAxis = require("src/components/translations/defaults/x_axis");
  var yAxis = require("src/components/translations/defaults/y_axis");
  var stack = require("src/components/translations/defaults/stack");
  var clipPath = require("src/components/translations/defaults/clippath");
  var zeroLine = require("src/components/translations/defaults/zeroline");
  var values = function (d) { return d; };
  var rects = {
    groupClass: "rects",
    cssClass: "bars",
    x: function (d, i, j, scale, accessor) {
      return scale(accessor.call(null, d, i));
    },
    y: function (d, i, j, scale, accessor) {
      return scale(d.y + d.y0);
      //return scale(accessor.call(null, d, i));
    },
    width: function (d, i, j, scale, data, accessor) {
      return scale.range()[1] / data.length;
    },
    height: function (d, i, j, scale, data, accessor) {
      return scale.range()[0] - scale(accessor.call(null, d, i));
    },
    rx: 0,
    ry: 0,
    fill: function (d, i, j) { return j; },
    stroke: function (d, i, j) { return j; },
    strokeWidth: 0,
    opacity: 1
  };

  return {
    margin: objectAPI(margin),
    x: valueAPI("x"),
    y: valueAPI("y"),
    values: functionAPI(values),
    stacked: booleanAPI(true),
    color: functionAPI(d3.scale.category10()),
    xScale: objectAPI(scale),
    yScale: objectAPI(scale),
    xAxis: objectAPI(xAxis),
    yAxis: objectAPI(yAxis),
    stack: objectAPI(stack),
    clipPath: objectAPI(clipPath),
    zeroLine: objectAPI(zeroLine),
    rects: objectAPI(rects)
  };
});
