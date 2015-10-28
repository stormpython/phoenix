define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/helpers/timeparser');

  return function horizontal() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.ordinal();
    var rx = d3.functor(0);
    var ry = d3.functor(0);
    var group = false;
    var groupPadding = 0;
    var timeInterval = null;
    var timePadding = 0.1;
    var groupScale = d3.scale.ordinal();
    var timeScale = d3.scale.ordinal();
    var j = 0; // stack layer counter

    function layout(data) {
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
          .rangeBands(yScale.range(), timePadding, 0);
      }

      groupRange = timeInterval ? [0, timeScale.rangeBand()] : [0, yScale.rangeBand()];
      groupScale.domain(d3.range(data.length))
        .rangeRoundBands(groupRange, groupPadding, 0);

      data.forEach(function (arr) {
        arr.forEach(function (d, i) {
          if (!d.coords) d.coords = {};

          d.coords.x = X.call(this, d, i);
          d.coords.y = Y.call(this, d, i, j);
          d.coords.width = width.call(this, d, i);
          d.coords.height = height.call(this, d, i);
          d.coords.rx = rx.call(this, d, i);
          d.coords.ry = ry.call(this, d, i);
        });

        j++; // increment thru stack layers
      });

      return data;
    }

    function X(d) {
      if (group) return (d.y < 0) ? xScale(d.y) : xScale(0);
      return (d.y < 0) ? xScale(d.y) : xScale(d.y0);
    }

    function Y(d, i, j) {
      if (group) {
        if (timeInterval) return yScale(x.call(this, d, i)) + groupScale(j);
        return yScale(x.call(this, d, i)) + groupScale(j);
      }
      if (timeInterval) return yScale(x.call(this, d, i));
      return yScale(x.call(this, d, i));
    }

    function width(d, i) {
      return xScale(d.y0 + Math.abs(y.call(this, d, i))) - xScale(d.y0);
    }

    function height() {
      if (group) return groupScale.rangeBand();
      if (timeInterval) return timeScale.rangeBand();
      return yScale.rangeBand();
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

    layout.rx = function (_) {
      if (!arguments.length) return rx;
      rx = d3.functor(_);
      return layout;
    };

    layout.ry = function (_) {
      if (!arguments.length) return ry;
      ry = d3.functor(_);
      return layout;
    };

    layout.group = function (_) {
      if (!arguments.length) return group;
      group = typeof _ === 'boolean' ? _ : group;
      return layout;
    };

    layout.groupPadding = function (_) {
      if (!arguments.length) return groupPadding;
      groupPadding = typeof _ === 'number' ? _ : groupPadding;
      return layout;
    };

    layout.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = typeof _ === 'string' ? _ : timeInterval;
      return layout;
    };

    layout.timePadding = function (_) {
      if (!arguments.length) return timePadding;
      timePadding = typeof _ === 'number' ? _ : timePadding;
      return layout;
    };

    return layout;
  };
});