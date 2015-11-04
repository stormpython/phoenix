define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/helpers/timeparser');

  return function scale() {
    var type = null;
    var accessor = null;
    var categories = null;
    var range = [0, 1];
    var min = null;
    var max = null;
    var padding = 0.1;
    var clamp = false;
    var utc = false;
    var timeInterval = null;

    function mixed(data) {
      var timeNotation;
      var step;

      // Flatten data
      data = data.reduce(function (a, b) {
        return a.concat(b);
      }, []);

      if (categories.length) {
        var ordinalDomain = categories.call(this, data)
          .filter(function (item, index, array) {
            return array.indexOf(item) === index;
          });

        return d3.scale.ordinal()
          .domain(ordinalDomain)
          .rangeRoundBands(range, padding, 0);
      }

      if (type === 'logarithmic') {
        return d3.scale.log()
          .domain([
            min ? Math.max(1, min) : Math.max(1, d3.min(data, accessor || Y)),
            max ? Math.max(1, max) : Math.max(1, d3.max(data, accessor || Y))
          ])
          .range(range);
      }

      if (type === 'datetime') {
        var scale = utc ? d3.time.scale.utc() : d3.time.scale();
        var maxDatum = d3.max(data, accessor || X);
        var timeNotation;
        var step;
        var timeOffset;

        if (timeInterval) {
          timeNotation = parseTime(timeInterval);
          step = parseFloat(timeInterval);
          timeOffset = d3.time[timeNotation].offset(maxDatum, step);
        }

        return scale.domain([
            d3.min(data, accessor || X),
            timeOffset ? timeOffset : maxDatum
          ])
          .range(range);
      }

      if (typeof d3.scale[type] === 'function') {
        return d3.scale[type]()
          .domain([
            min ? min : Math.min(0, d3.min(data, accessor || Y)),
            max ? max : Math.max(0, d3.max(data, accessor || Y))
          ])
          .range(range)
          .clamp(clamp)
          .nice();
      }
    }

    function X(d) { return d.x; }
    function Y(d) { return d.y; }

    // Public API
    mixed.type = function (_) {
      if (!arguments.length) return type;
      type = _;
      return mixed;
    };

    mixed.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return mixed;
    };

    mixed.categories = function (_) {
      if (!arguments.length) return categories;
      categories = d3.functor(_);
      return mixed;
    };

    mixed.min = function (_) {
      if (!arguments.length) return min;
      min = _;
      return mixed;
    };

    mixed.max = function (_) {
      if (!arguments.length) return max;
      max = _;
      return mixed;
    };

    mixed.padding = function (_) {
      if (!arguments.length) return padding;
      padding = _;
      return mixed;
    };

    mixed.range = function (_) {
      if (!arguments.length) return range;
      range = _;
      return mixed;
    };

    mixed.clamp = function (_) {
      if (!arguments.length) return clamp;
      clamp = _;
      return mixed;
    };

    mixed.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = _;
      return mixed;
    };

    mixed.utc = function (_) {
      if (!arguments.length) return utc;
      utc = _;
      return mixed;
    };

    return mixed;
  };
});