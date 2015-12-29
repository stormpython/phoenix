define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');
  var valuator = require('src/modules/d3_components/utils/valuator');

  return function box() {
    // Private variables
    var values = function (d) { return d.values; };
    var accessor = function (d) { return d; };

    function layout(data) {
      // Do not mutate the original data, return a new object
      return _.map(data, function (d, i) {
        var numbers = accessor.call(this, values.call(this, d, i));
        var obj = {
          coords: {
            median: d3.median(numbers),
            q1: d3.quantile(numbers, 0.25),
            q3: d3.quantile(numbers, 0.75),
            max: d3.max(numbers),
            min: d3.min(numbers)
          }
        };

        function reduce(a, b) {
          a[b] = d[b];
          return a;
        }

        return Object.keys(d).reduce(reduce, obj);
      });
    }

    // Public API
    layout.values = function (v) {
      if (!arguments.length) { return values; }
      values = valuator(v);
      return layout;
    };

    layout.accessor = function (v) {
      if (!arguments.length) { return accessor; }
      accessor = valuator(v);
      return layout;
    };

    return layout;
  };
});
