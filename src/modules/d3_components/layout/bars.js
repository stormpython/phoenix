define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/helpers/parse_time');
  var isValidTime = require('src/modules/d3_components/helpers/is_valid_time');

  return function bars() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var key = function (d) { return d.key; };
    var xScale = d3.scale.ordinal();
    var yScale = d3.scale.linear();
    var rx = d3.functor(0);
    var ry = d3.functor(0);
    var stackOpts = { offset: 'zero', order: 'default', out: out };
    var group = false;
    var groupPadding = 0;
    var timeInterval = null;
    var timePadding = 0;

    function layout(data) {
      var isTime = isValidTime(timeInterval);
      var stack = d3.layout.stack()
        .values(function (d) { return d.values; })
        .offset(stackOpts.offset)
        .order(stackOpts.order)
        .out(stackOpts.out);
      var groupScale = d3.scale.ordinal();
      var timeScale = d3.scale.ordinal()
        .rangeBands(xScale.range(), timePadding, 0);
      var j = 0; // stack layer counter
      var groupRange;
      var timeNotation;
      var extent;
      var step;
      var start;
      var stop;

      function X(d, i) {
        if (group) {
          return xScale(x.call(this, d, i)) + groupScale(j);
        }
        return xScale(x.call(this, d, i));
      }

      function Y(d, i) {
        if (group) {
          return yScale(y.call(this, d, i));
        }
        return yScale(d.y0 + Math.abs(y.call(this, d, i)));
      }

      function width() {
        if (group) {
          return groupScale.rangeBand();
        }
        if (isTime) {
          return timeScale.rangeBand();
        }
        return xScale.rangeBand();
      }

      function height(d, i) {
        return yScale(d.y0) - yScale(d.y0 + Math.abs(y.call(this, d, i)));
      }

      data = stack(d3.nest().key(key).entries(data));

      groupRange = isTime ? [0, timeScale.rangeBand()] : [0, xScale.rangeBand()];
      groupScale.domain(d3.range(data.length))
        .rangeRoundBands(groupRange, groupPadding, 0);

      if (isTime) {
        timeNotation = parseTime(timeInterval);
        step = parseFloat(timeInterval);
        extent = d3.extent(d3.merge(data.reduce(function (a, b) {
          return a.values.concat(b.values);
        }, [])), x);
        start = extent[0];
        stop = d3.time[timeNotation].offset(extent[1], step);
        timeScale.domain(d3.time[timeNotation].range(start, stop, step))
          .rangeBands(xScale.range(), timePadding, 0);
      }

      data.forEach(function (obj) {
        obj.values.forEach(function (d, i) {
          d.dx = X.call(this, d, i);
          d.dy = Y.call(this, d, i);
          d.width = width.call(this, d, i);
          d.height = height.call(this, d, i);
          d.rx = rx.call(this, d, i);
          d.ry = ry.call(this, d, i);
        });

        j++; // increment thru stack layers
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

    layout.key = function (_) {
      if (!arguments.length) return key;
      key = d3.functor(_);
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

    layout.stack = function (_) {
      if (!arguments.length) return stackOpts;
      stackOpts.offset = typeof _.offset !== 'undefined' ? _.offset : stackOpts.offset;
      stackOpts.order = typeof _.order !== 'undefined' ? _.order : stackOpts.order;
      stackOpts.out = typeof _.out !== 'undefined' ? _.out : stackOpts.out;
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
      timeInterval = typeof _ === 'string' ? _ : timeInteval;
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