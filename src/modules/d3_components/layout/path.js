define(function (require) {
  var d3 = require('d3');

  return function path() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var label = function (d) { return d.label; };
    var type = 'area';
    var offset = 'zero';
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var interpolate = 'linear';
    var tension = 0.7;
    var defined = function (d) { return d.y !== null; };

    function layout(data) {
      var pathFunction = d3.svg[type]()
        .interpolate(interpolate)
        .tension(tension)
        .defined(defined);

      if (type === 'area') {
        pathFunction.x(X).y0(Y0).y1(Y1);
      } else {
        pathFunction.x(X).y(Y);
      }

      data = data.map(function (d) {
        return {
          d: pathFunction(d),
          label: label.call(this, d[0]),
          values: d
        };
      });

      return [data];
    }

    function X(d, i) {
      if (typeof xScale.rangeRoundBands === 'function') {
        return xScale(x.call(this, d, i)) + xScale.rangeBand() / 2;
      }
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);

      if (offset === 'overlap') return yScale(min);
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (offset === 'overlap') return yScale(y.call(this, d, i));
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

    layout.label = function (_) {
      if (!arguments.length) return label;
      label = d3.functor(_);
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

    layout.offset = function (_) {
      if (!arguments.length) return offset;
      offset = typeof _ === 'string' ? _ : offset;
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