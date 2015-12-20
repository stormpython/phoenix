define(function (require) {
  var d3 = require('d3');

  return function color(scale) {
    scale = scale || d3.scale.category10();

    return function (d, i) {
      return scale(i);
    };
  };
});
