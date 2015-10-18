define(function (require) {
  var d3 = require('d3');

  return function scatter() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var radius = d3.functor(5);

    function layout(data) {
      // Merge inner arrays => [[]] to []
      data = data
        .reduce(function (a, b) {
          return a.concat(b);
        }, [])
        .map(function (d, i) {
          if (!d.coords) d.coords = {};

          d.coords.cx = xScale(x.call(this, d, i));
          d.coords.cy = yScale(y.call(this, d, i));
          d.coords.radius = radius.call(this, d, i);

          return d;
        });

      return data;
    }

    // Public API
    layout.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return layout;
    };

    layout.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
      return layout;
    };

    layout.radius = function (_) {
      if (!arguments.length) return radius;
      radius = d3.functor(_);
      return layout;
    };

    layout.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = typeof _ === 'function' ? _ : xScale;
      return layout;
    };

    layout.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = typeof _ === 'function' ? _ : yScale;
      return layout;
    };

    return layout;
  };
});