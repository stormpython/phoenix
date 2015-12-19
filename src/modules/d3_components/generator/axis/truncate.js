define(function (require) {
  var d3 = require('d3');

  return function truncate() {
    var maxCharLength = 10;

    function component(text) {
      text.each(function () {
        var txt = d3.select(this);
        var labelCharLength = txt.text().length;

        // Shorten label and append ..
        if (labelCharLength > maxCharLength) {
          var truncatedLabel = txt.text().slice(0, maxCharLength) + '..';
          txt.text(truncatedLabel);
        }
      });
    }

    // Public API

    /**
     * [maxCharLength description]
     * @param  {[type]} v [description]
     * @return {[type]}   [description]
     */
    component.maxCharLength = function (v) {
      if (!arguments.length) { return maxCharLength; }
      maxCharLength = typeof v === 'number' ? v : maxCharLength;
      return component;
    };

    return component;
  };
});
