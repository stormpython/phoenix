define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/utils/timeparser');

  return function vertical() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.ordinal();
    var yScale = d3.scale.linear();
    var rx = d3.functor(0);
    var ry = d3.functor(0);
    var group = false;
    var groupPadding = 0;
    var timeInterval;
    var timePadding = 0.1;
    var groupScale = d3.scale.ordinal();
    var timeScale = d3.scale.ordinal();

    function negValue(y0) { return yScale(y0); }

    function X(d, i, j) {
      if (group) { return xScale(x.call(this, d, i)) + groupScale(j); }
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      if (group) { return (d.y < 0) ? yScale(0) : yScale(y.call(this, d, i)); }
      return (d.y < 0) ? negValue(d.y0) : yScale(d.y0 + y.call(this, d, i));
    }

    function width() {
      if (group) { return groupScale.rangeBand(); }
      if (timeInterval) { return timeScale.rangeBand(); }
      return xScale.rangeBand();
    }

    function height(d, i) {
      return yScale(d.y0) - yScale(d.y0 + Math.abs(y.call(this, d, i)));
    }

    function layout(data) {
      var j = -1; // stack layer counter
      var groupRange;
      var timeNotation;
      var extent;
      var step;
      var start;
      var stop;

      if (timeInterval) {
        timeNotation = parseTime(timeInterval);
        step = parseFloat(timeInterval);
        extent = d3.extent(d3.merge(data), x);
        start = extent[0];
        stop = d3.time[timeNotation].offset(extent[1], step);

        timeScale
          .domain(d3.time[timeNotation].range(start, stop, step))
          .rangeBands(xScale.range(), timePadding, 0);
      }

      groupRange = timeInterval ? [0, timeScale.rangeBand()] : [0, xScale.rangeBand()];
      groupScale.domain(d3.range(data.length))
        .rangeRoundBands(groupRange, groupPadding, 0);

      // Do not mutate the original data, returns a new object
      return data.map(function (arr) {
        j += 1; // increment thru stack layers
        return arr.map(function (d, i) {
          var obj = {
            coords: {
              x: X.call(this, d, i, j),
              y: Y.call(this, d, i),
              width: width.call(this, d, i),
              height: height.call(this, d, i),
              rx: rx.call(this, d, i),
              ry: ry.call(this, d, i)
            }
          };

          function reduce(a, b) {
            a[b] = d[b];
            return a;
          }

          return Object.keys(d).reduce(reduce, obj);
        });
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

    layout.xScale = function (v) {
      if (!arguments.length) { return xScale; }
      xScale = typeof v === 'function' ? v : xScale;
      return layout;
    };

    layout.yScale = function (v) {
      if (!arguments.length) { return yScale; }
      yScale = typeof v === 'function' ? v : yScale;
      return layout;
    };

    layout.rx = function (v) {
      if (!arguments.length) { return rx; }
      rx = d3.functor(v);
      return layout;
    };

    layout.ry = function (v) {
      if (!arguments.length) { return ry; }
      ry = d3.functor(v);
      return layout;
    };

    layout.group = function (v) {
      if (!arguments.length) { return group; }
      group = typeof v === 'boolean' ? v : group;
      return layout;
    };

    layout.groupPadding = function (v) {
      if (!arguments.length) { return groupPadding; }
      groupPadding = typeof v === 'number' ? v : groupPadding;
      return layout;
    };

    layout.timeInterval = function (v) {
      if (!arguments.length) { return timeInterval; }
      timeInterval = typeof v === 'string' ? v : timeInterval;
      return layout;
    };

    layout.timePadding = function (v) {
      if (!arguments.length) { return timePadding; }
      timePadding = typeof v === 'number' ? v : timePadding;
      return layout;
    };

    return layout;
  };
});
