define(function (require) {
  var d3 = require('d3');

  /**
   * [color Returns an accessor function for the d3 category10 color scale.]
   * @param  {[Function]} scale [color scale]
   * @return {[Function]}       [accessor function that returns a color based on the indexed value]
   */
  return function color(scale) {
    scale = scale || d3.scale.category10();

    return function (d, i) {
      return scale(i);
    };
  };
});
