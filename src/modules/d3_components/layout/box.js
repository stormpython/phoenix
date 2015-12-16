define(function (require) {
  var d3 = require('d3');
  var valuator = require('src/modules/d3_components/helpers/valuator');

  return function box() {
    // Private variables
    var values = function (d) { return d.values; };
    var accessor = function (d) { return d; };

    function layout(data) {
      // Do not mutate the original data, return a new object
      return data.map(function (d, i) {
        var numbers = accessor.call(this, values.call(this, d, i));
        var obj = {
          median: d3.median(numbers),
          q1: d3.quantile(numbers, 0.25),
          q3: d3.quantile(numbers, 0.75),
          max: d3.max(numbers),
          min: d3.min(numbers)
        };

        function reduce(a, b) {
          a[b] = d[b];
          return a;
        }

        return Object.keys(d).reduce(reduce, obj);
      });
    }

    // Public API
    layout.values = function (_) {
      if (!arguments.length) return values;
      values = valuator(_);
      return layout;
    };

    layout.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return layout;
    };

    return layout;
  };
});
