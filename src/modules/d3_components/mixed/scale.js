define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/helpers/timeparser');
  var valuator = require('src/modules/d3_components/helpers/valuator');
  var isNumber = require('src/modules/d3_components/helpers/is_number');

  return function scale() {
    var type = null;
    var accessor = null;
    var categories = null;
    var sort = null;
    var range = [0, 1];
    var extent = false;
    var min = null;
    var max = null;
    var padding = 0.1;
    var clamp = false;
    var utc = false;
    var timeInterval = null;

    function mixed(data) {
      // Flatten data
      data = data.reduce(function (a, b) {
        return a.concat(b);
      }, []);

      if (categories) {
        var ordinalDomain;

        if (Array.isArray(categories)) {
          ordinalDomain = categories;
        } else if (typeof categories === 'function') {
          ordinalDomain = data.sort(sort).map(categories)
            .filter(function (item, index, array) {
              return array.indexOf(item) === index;
            });
        }

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
          .range(range)
          .clamp(clamp)
          .nice();
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
          .range(range)
          .clamp(clamp)
          .nice();
      }

      if (typeof d3.scale[type] === 'function') {
        return d3.scale[type]()
          .domain(extent ? d3.extent(data, accessor || Y) : [
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
      type = typeof _ === 'string' ? _ : type;
      return mixed;
    };

    mixed.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return mixed;
    };

    mixed.categories = function (_) {
      if (!arguments.length) return categories;
      categories = typeof _ === 'function' || Array.isArray(_) ? _ : categories;
      return mixed;
    };

    mixed.sort = function (_) {
      if (!arguments.length) return sort;
      sort = typeof _ === 'function' ? _ : sort;
      return mixed;
    };

    mixed.extent = function (_) {
      if (!arguments.length) return extent;
      extent = typeof _ === 'boolean' ? _ : extent;
      return mixed;
    };

    mixed.min = function (_) {
      if (!arguments.length) return min;
      min = typeof _ === 'number' ? _ : min;
      return mixed;
    };

    mixed.max = function (_) {
      if (!arguments.length) return max;
      max = typeof _ === 'number' ? _ : max;
      return mixed;
    };

    mixed.padding = function (_) {
      if (!arguments.length) return padding;
      padding = typeof _ === 'number' ? _ : padding;
      return mixed;
    };

    mixed.range = function (_) {
      if (!arguments.length) return range;
      range = Array.isArray(_) && _.length === 2 && _.every(isNumber) ? _ : range;
      return mixed;
    };

    mixed.clamp = function (_) {
      if (!arguments.length) return clamp;
      clamp = typeof _ === 'boolean' ? _ : clamp;
      return mixed;
    };

    mixed.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = typeof _ === 'string' ? _ : timeInterval;
      return mixed;
    };

    mixed.utc = function (_) {
      if (!arguments.length) return utc;
      utc = typeof _ === 'boolean' ? _ : utc;
      return mixed;
    };

    return mixed;
  };
});