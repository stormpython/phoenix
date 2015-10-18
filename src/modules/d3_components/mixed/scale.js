define(function (require) {
  var d3 = require('d3');

  return function scale() {
    var scale = d3.scale.linear();
    var accessor = function (d) { return d.x; };
    var sort = null;
    var min = null;
    var max = null;
    var padding = 0;
    var range = [0, 1];
    var nice = true;
    var clamp = false;

    function mixed(data) {
      data = data.reduce(function (a, b) {
        return a.concat(b);
      }, []);

      scale.domain([
        min ? min : d3.min(data, accessor),
        max ? max : d3.max(data, accessor)
      ]);

      if (typeof scale.rangeRoundBands === 'function') {
        scale
          .domain(data.map(accessor).sort(null))
          .rangeRoundBands(range, padding, 0);
      } else {
        scale
          .domain([
            min ? min : d3.min(data, accessor),
            max ? max : d3.max(data, accessor)
          ])
          .range(range, padding);
      }

      if (nice) scale.nice();
      if (clamp) scale.clamp(true);

      return scale;
    }

    return mixed;
  };
});