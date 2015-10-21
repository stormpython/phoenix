define(function (require) {
  var d3 = require('d3');
  var scaletor = require('src/modules/d3_components/helpers/scaletor');

  return function scale() {
    var scale = d3.scale.linear();
    var accessor = function (d) { return d.y; };
    var sort = null;
    var min = null;
    var max = null;
    var padding = 0;
    var nice = true;
    var clamp = false;

    function mixed(data) {
      data = data.reduce(function (a, b) {
        return a.concat(b);
      }, []);

      if (typeof scale.rangeRoundBands === 'function') {
        scale
          .domain(data.map(accessor).sort(sort))
          .rangeRoundBands(range, padding, 0);
      } else {
        scale
          .domain([
            min ? min : d3.min(data, accessor) || 0,
            max ? max : d3.max(data, accessor) || 1
          ])
          .range(range, padding);

        if (nice) scale.nice();
        if (clamp) scale.clamp(true);
      }

      return scale;
    }

    mixed.type = function (_) {
      if (!arguments.length) return scale;
      scale = scaletor(_);
      return mixed;
    };

    mixed.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return mixed;
    };

    mixed.sort = function (_) {
      if (!arguments.length) return sort;
      sort = _;
      return mixed;
    };

    mixed.min = function (_) {
      if (!arguments.length) return min;
      min = _;
      return mixed;
    };

    mixed.max = function (_) {
      if (!arguments.length) return max;
      max = _;
      return mixed;
    };

    mixed.padding = function (_) {
      if (!arguments.length) return padding;
      padding = _;
      return mixed;
    };

    mixed.range = function (_) {
      if (!arguments.length) return range;
      range = _;
      return mixed;
    };

    mixed.nice = function (_) {
      if (!arguments.length) return nice;
      nice = _;
      return mixed;
    };

    mixed.clamp = function (_) {
      if (!arguments.length) return clamp;
      clamp = _;
      return mixed;
    };

    return mixed;
  };
});