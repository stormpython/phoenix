define(function (require) {
  require("jubilee"); // Includes D3
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
    //x: function (d, i, j, scale) {
    //  return scale(xValue.call(null, d, i));
    //},
    //y: function (d, i, j, scale) {
    //  return scale(yValue.call(null, d, i));
    //},
    //width: function (d, i, j, scale, data) {
    //  return scale.range()[1] / data.length;
    //},
    //height: function (d, i, j, scale) {
    //  return scale.range()[0] - scale(yValue.call(null, d, i));
    //},
    rx: 0,
    ry: 0,
    //fill: function (d, i) { return color(i); },
    //stroke: function (d, i) { return color(i); },
    strokeWidth: 0,
    opacity: 1
  };

  return {
    margin: require("src/components/translations/api/object")(margin),
    x: require("src/components/translations/api/value")("x"),
    y: require("src/components/translations/api/value")("y"),
    values: require("src/components/translations/api/function")(values),
    stacked: require("src/components/translations/api/boolean")(true),
    color: require("src/components/translations/api/function")(d3.scale.category10()),
    xScale: require("src/components/translations/api/object")(scale),
    yScale: require("src/components/translations/api/object")(scale),
    xAxis: require("src/components/translations/api/object")(xAxis),
    yAxis: require("src/components/translations/api/object")(yAxis),
    stack: require("src/components/translations/api/object")(stack),
    clipPath: require("src/components/translations/api/object")(clipPath),
    zeroLine: require("src/components/translations/api/object")(zeroLine),
    rects: require("src/components/translations/api/object")(rects)
  };
});
