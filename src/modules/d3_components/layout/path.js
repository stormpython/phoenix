define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

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
    var defined = function (d) { return !_.isNull(d.y); };

    function X(d, i) {
      if (_.isFunction(xScale.rangeRoundBands)) {
        return xScale(x.call(this, d, i)) + xScale.rangeBand() / 2;
      }
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);

      if (offset === 'overlap') { return yScale(min); }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (offset === 'overlap') { return yScale(y.call(this, d, i)); }
      return yScale(d.y0 + y.call(this, d, i));
    }

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

      // Do not mutate the original data, return a new object
      return _.map(data, function (d, i) {
        return {
          d: pathFunction(d),
          label: label.call(this, d[0], i),
          values: d
        };
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

    layout.label = function (v) {
      if (!arguments.length) { return label; }
      label = d3.functor(v);
      return layout;
    };

    layout.type = function (v) {
      var opts = ['area', 'line'];

      if (!arguments.length) { return type; }
      type = _.includes(opts, v) ? v : type;
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

    layout.offset = function (v) {
      if (!arguments.length) { return offset; }
      offset = _.isString(v) ? v : offset;
      return layout;
    };

    layout.interpolate = function (v) {
      if (!arguments.length) { return interpolate; }
      interpolate = v;
      return layout;
    };

    layout.tension = function (v) {
      if (!arguments.length) { return tension; }
      tension = v;
      return layout;
    };

    layout.defined = function (v) {
      if (!arguments.length) { return defined; }
      defined = v;
      return layout;
    };

    return layout;
  };
});
