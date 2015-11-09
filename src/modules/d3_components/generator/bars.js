define(function (require) {
  var d3 = require('d3');
  var vertical = require('src/modules/d3_components/layout/bars/vertical');
  var horizontal = require('src/modules/d3_components/layout/bars/horizontal');
  var rect = require('src/modules/d3_components/generator/element/svg/rect');

  return function bars() {
    var color = d3.scale.category10();
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.scale.linear();
    var yScale = d3.scale.ordinal();
    var rx = d3.functor(0);
    var ry = d3.functor(0);
    var group = false;
    var timeInterval = null;
    var groupPadding = 0;
    var timePadding = 0;
    var cssClass = 'bar';
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var fillOpacity = 1;
    var orientation = 'vertical';
    var rects = rect();
    var verticalLayout = vertical();
    var horizontalLayout = horizontal();

    function generator(selection) {
      selection.each(function (data) {
        var barLayout = orientation === 'vertical' ?
          verticalLayout : horizontalLayout;

        barLayout.x(x).y(y).rx(rx).ry(ry)
          .xScale(xScale)
          .yScale(yScale)
          .group(group)
          .groupPadding(groupPadding)
          .timeInterval(timeInterval)
          .timePadding(timePadding);

        rects.class(cssClass)
          .fill(fill)
          .stroke(stroke)
          .strokeWidth(strokeWidth)
          .fillOpacity(fillOpacity);

        var g = d3.select(this).selectAll('.bar-layers')
          .data(barLayout(data));

        g.exit().remove();
        g.enter().append('g');
        g.attr('class', 'bar-layers')
          .call(rects);
      });
    }

    function colorFill(d, i) {
      return color(i);
    }

    // Public API
    generator.x = function (_) {
      if (!arguments.length) return x;
      x = d3.functor(_);
      return generator;
    };

    generator.y = function (_) {
      if (!arguments.length) return y;
      y = d3.functor(_);
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

    generator.rx = function (_) {
      if (!arguments.length) return rx;
      rx = d3.functor(_);
      return generator;
    };

    generator.ry = function (_) {
      if (!arguments.length) return ry;
      ry = d3.functor(_);
      return generator;
    };

    generator.group = function (_) {
      if (!arguments.length) return group;
      group = typeof _ === 'boolean' ? _ : group;
      return generator;
    };

    generator.groupPadding = function (_) {
      if (!arguments.length) return groupPadding;
      groupPadding = typeof _ === 'number' ? _ : groupPadding;
      return generator;
    };

    generator.timeInterval = function (_) {
      if (!arguments.length) return timeInterval;
      timeInterval = typeof _ === 'string' ? _ : timeInterval;
      return generator;
    };

    generator.timePadding = function (_) {
      if (!arguments.length) return timePadding;
      timePadding = typeof _ === 'number' ? _ : timePadding;
      return generator;
    };

    generator.orientation = function (_) {
      if (!arguments.length) return orientation;
      orientation = typeof _ === 'string' ? _ : orientation;
      return generator;
    };

    generator.class= function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
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
      stroke = _;
      return generator;
    };

    generator.strokeWidth = function (_) {
      if (!arguments.length) return strokeWidth;
      strokeWidth = _;
      return generator;
    };

    return generator;
  };
});