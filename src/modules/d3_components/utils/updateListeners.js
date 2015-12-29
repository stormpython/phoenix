define(function (require) {
  return function updateListeners(svg, listeners, processor) {
    _.forEach(d3.entries(listeners), function (d) {
      if (svg) {
        if (!d.value || !d.value.length) {
          svg.on(d.key, null);
        }

        svg.on(d.key, function () {
          d3.event.stopPropagation(); // => event.stopPropagation()

          _.forEach(d.value, function (listener) {
            listener.call(this, processor(d3.event));
          });
        });
      }
    });
  };
});
