define(function (require) {
  var d3 = require('d3');
  var parseTime = require('src/modules/d3_components/helpers/timeparser');
  var valuator = require('src/modules/d3_components/helpers/valuator');

  return function scale() {
    var type = null;
    var accessor = function (d) { return d.y; };
    var categories = [];
    var range = [0, 1];
    var min = null;
    var max = null;
    var padding = 0;
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
        return d3.scale.ordinal()
          .domain(categories)
          .rangeRoundBands(range, padding, 0);
      }

      if (type === 'datetime') {
        var scale = utc ? d3.time.scale.utc() : d3.time.scale();
        timeNotation = parseTime(timeInterval);
        step = parseFloat(timeInterval);

        return scale
          .domain([
            d3.min(data, accessor),
            d3.max(data, accessor)
            //d3.time[timeNotation].offset(d3.max(data, accessor), step)
          ])
          .range(range);
      }

      if (typeof d3.scale[type] === 'function') {
        return d3.scale[type]()
          .domain([
            min ? min : Math.min(0, d3.min(data, accessor)),
            max ? max : Math.max(0, d3.max(data, accessor))
          ])
          .range(range)
          .clamp(clamp)
          .nice();
      }
    }

    mixed.type = function (_) {
      if (!arguments.length) return type;
      type = _;
      return mixed;
    };

    mixed.accessor = function (_) {
      if (!arguments.length) return accessor;
      accessor = valuator(_);
      return mixed;
    };

    mixed.categories = function (_) {
      if (!arguments.length) return categories;
      categories = Array.isArray(_) ? _ : categories;
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