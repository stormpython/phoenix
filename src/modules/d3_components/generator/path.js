define(function (require) {
  var d3 = require('d3');
  var layout = require('src/modules/d3_components/layout/path');
  var pathGenerator = require('src/modules/d3_components/generator/element/svg/path');
  var valuator = require('src/modules/d3_components/helpers/valuator');

  return function paths() {
    var color = d3.scale.category10();
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
    var cssClass = 'path';
    var transform = 'translate(0,0)';
    var fill = 'none';
    var fillOpacity = null;
    var stroke = colorFill;
    var strokeWidth = 1;
    var strokeOpacity = null;
    var pathLayout = layout();
    var paths = pathGenerator();

    function generator(selection) {
      selection.each(function (data) {
        pathLayout.x(x).y(y).label(label)
          .xScale(xScale)
          .yScale(yScale)
          .type(type)
          .offset(offset)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        paths.class(cssClass)
          .transform(transform)
          .fill(type === 'area' && fill === 'none' ? colorFill : fill)
          .fillOpacity(fillOpacity)
          .stroke(stroke)
          .strokeWidth(strokeWidth)
          .strokeOpacity(strokeOpacity);

        var g = d3.select(this).selectAll('g.path-layers')
          .data(pathLayout(data));

        g.exit().remove();
        g.enter().append('g').attr('class', 'path-layers');
        g.call(paths);
      });
    }

    function colorFill(d, i) { return color(i); }

    // Public API
    generator.x = function (_) {
      if (!arguments.length) return x;
      x = valuator(_);
      return generator;
    };

    generator.y = function (_) {
      if (!arguments.length) return y;
      y = valuator(_);
      return generator;
    };

    generator.label = function (_) {
      if (!arguments.length) return label;
      label = valuator(_);
      return generator;
    };

    generator.type = function (_) {
      var opts = ['area', 'line'];
      var isValid = opts.indexOf(_) !== -1;

      if (!arguments.length) return type;
      type = isValid ? _ : type;
      return generator;
    };

    generator.xScale = function (_) {
      if (!arguments.length) return xScale;
      xScale = typeof _ === 'function' ? _ : xScale;
      return generator;
    };

    generator.yScale = function (_) {
      if (!arguments.length) return yScale;
      yScale = typeof _ === 'function' ? _ : yScale;
      return generator;
    };

    generator.offset = function (_) {
      if (!arguments.length) return offset;
      offset = _;
      return generator;
    };

    generator.interpolate = function (_) {
      if (!arguments.length) return interpolate;
      interpolate = _;
      return generator;
    };

    generator.tension = function (_) {
      if (!arguments.length) return tension;
      tension = _;
      return generator;
    };

    generator.defined = function (_) {
      if (!arguments.length) return defined;
      defined = _;
      return generator;
    };

    generator.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return generator;
    };

    generator.transform = function (_) {
      if (!arguments.length) return transform;
      transform = _;
      return generator;
    };

    generator.fill = function (_) {
      if (!arguments.length) return fill;
      fill = _;
      return generator;
    };

    generator.fillOpacity = function (_) {
      if (!arguments.length) return fillOpacity;
      fillOpacity = _;
      return generator;
    };

    generator.stroke = function (_) {
      if (!arguments.length) return stroke;
      stroke = d3.functor(_);
      return generator;
    };

    generator.strokeWidth = function (_) {
      if (!arguments.length) return strokeWidth;
      strokeWidth = _;
      return generator;
    };

    generator.strokeOpacity = function (_) {
      if (!arguments.length) return strokeOpacity;
      strokeOpacity = _;
      return generator;
    };

    return generator;
  };
});
