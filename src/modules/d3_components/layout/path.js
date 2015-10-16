define(function (require) {
  var d3 = require('d3');

  return function path() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var type = 'area';
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var stackOpts = { offset: 'zero', order: 'default', out: out };
    var interpolate = 'linear';
    var tension = 0.7;
    var defined = function (d) { return d.y !== null; };

    function layout(data) {
      var stack = d3.layout.stack()
        .x(x)
        .y(y)
        .offset(stackOpts.offset)
        .order(stackOpts.order)
        .out(stackOpts.out);
      var pathFunction = d3.svg[type]()
        .interpolate(interpolate)
        .tension(tension)
        .defined(defined);

      if (type === 'area') {
        pathFunction.x(X).y0(Y0).y1(Y1)
      } else {
        pathFunction.x(X).y(Y)
      }

      data = stack(data);

      data.map(function (d) {
        return {
          d: pathFunction(d),
          values: d
        };
      });

      return data;
    }

    function out(d, y0, y) {
      d.y0 = y0;
      d.y = y;
    }

    function X(d, i) {
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);

      if (offset === 'overlap') {
        return yScale(min);
      }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (offset === 'overlap') {
        return yScale(y.call(this, d, i));
      }
      return yScale(d.y0 + y.call(this, d, i));
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

    layout.type = function (_) {
      var opts = ['area', 'line'];
      var isValid = opts.indexOf(_) !== -1;

      if (!arguments.length) return type;
      type = isValid ? _ : type;
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

    layout.stack = function (_) {
      if (!arguments.length) return stackOpts;
      stackOpts.offset = typeof _.offset !== 'undefined' ? _.offset : stackOpts.offset;
      stackOpts.order = typeof _.order !== 'undefined' ? _.order : stackOpts.order;
      stackOpts.out = typeof _.out !== 'undefined' ? _.out : stackOpts.out;
      return layout;
    };

    layout.interpolate = function (_) {
      if (!arguments.length) return interpolate;
      interpolate = _;
      return layout;
    };

    layout.tension = function (_) {
      if (!arguments.length) return tension;
      tension = _;
      return layout;
    };

    layout.defined = function (_) {
      if (!arguments.length) return defined;
      defined = _;
      return layout;
    };

    return layout;
  };
});