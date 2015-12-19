define(function (require) {
  var d3 = require('d3');

  return function text() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var dx = function (d) { return d.dx || 0; };
    var dy = function (d) { return d.dy || 0; };
    var transform;
    var cssClass = 'text';
    var fill = '#ffffff';
    var anchor = 'middle';
    var pointerEvents;
    var texts = '';

    function element(selection) {
      selection.each(function (data) {
        var word = d3.select(this).selectAll('text')
          .data(data);

        word.exit().remove();

        word.enter().append('text');

        word
          .attr('class', cssClass)
          .attr('transform', transform)
          .attr('x', x)
          .attr('y', y)
          .attr('dx', dx)
          .attr('dy', dy)
          .attr('fill', fill)
          .style('text-anchor', anchor)
          .style('pointer-events', pointerEvents)
          .text(texts);
      });
    }

    // Public API

    /**
     * [x description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.x = function (v) {
      if (!arguments.length) { return x; }
      x = d3.functor(v);
      return element;
    };

    /**
     * [y description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.y = function (v) {
      if (!arguments.length) { return y; }
      y = d3.functor(v);
      return element;
    };

    /**
     * [dx description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.dx = function (v) {
      if (!arguments.length) { return dx; }
      dx = d3.functor(v);
      return element;
    };

    /**
     * [dy description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.dy = function (v) {
      if (!arguments.length) { return dy; }
      dy = d3.functor(v);
      return element;
    };

    /**
     * [transform description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.transform = function (v) {
      if (!arguments.length) { return transform; }
      transform = v;
      return element;
    };

    /**
     * [class description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.class = function (v) {
      if (!arguments.length) { return cssClass; }
      cssClass = v;
      return element;
    };

    /**
     * [anchor description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.anchor = function (v) {
      if (!arguments.length) { return anchor; }
      anchor = v;
      return element;
    };

    /**
     * [fill description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.fill = function (v) {
      if (!arguments.length) { return fill; }
      fill = v;
      return element;
    };

    /**
     * [pointerEvents description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.pointerEvents = function (v) {
      if (!arguments.length) { return pointerEvents; }
      pointerEvents = v;
      return element;
    };

    /**
     * [text description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    element.text = function (v) {
      if (!arguments.length) { return texts; }
      texts = v;
      return element;
    };

    return element;
  };
});
