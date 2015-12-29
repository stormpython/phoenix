define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

  return function scatter() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var radius = d3.functor(5);

    function X(d, i) {
      if (_.isFunction(xScale.rangeRoundBands)) {
        return xScale(x.call(this, d, i)) + xScale.rangeBand() / 2;
      }
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      if (_.isFunction(yScale.rangeRoundBands)) {
        return yScale(x.call(this, d, i)) + yScale.rangeBand() / 2;
      }
      return yScale(y.call(this, d, i));
    }

    function layout(data) {
      // Merge inner arrays => [[]] to []
      // Do not mutate the original data, return a new object
      return data
        .reduce(function (a, b) {
          return a.concat(b);
        }, [])
        .map(function (d, i) {
          var obj = {
            coords: {
              cx: X.call(this, d, i),
              cy: Y.call(this, d, i),
              radius: radius.call(this, d, i)
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
    layout.x = function (v) {
      if (!arguments.length) { return x; }
      x = d3.functor(v);
      return layout;
    };

    layout.y = function (v) {
      if (!arguments.length) { return y; }
      y = d3.functor(v);
      return layout;
    };

    layout.radius = function (v) {
      if (!arguments.length) { return radius; }
      radius = d3.functor(v);
      return layout;
    };

    layout.xScale = function (v) {
      if (!arguments.length) { return xScale; }
      xScale = _.isFunction(v) ? v : xScale;
      return layout;
    };

    layout.yScale = function (v) {
      if (!arguments.length) { return yScale; }
      yScale = _.isFunction(v) ? v : yScale;
      return layout;
    };

    return layout;
  };
});
