define(function () {
  return function stackNegPos() {
    var placement = [0, 0];
    var count = 0;
    var stackCount;

    function out(d, y0, y) {
      if (count === stackCount) {
        placement = [0, 0];
        count = 0;
      }

      if (y < 0) {
        d.y0 = placement[0];
        placement[0] += y;
      }

      if (y > 0) {
        d.y0 = placement[1];
        placement[1] += y;
      }

      d.y = y;
      count += 1;
    }

    // Public API
    out.stackCount = function(_) {
      if (!arguments.length) return stackCount;
      stackCount = _;
      return out;
    };

    return out;
  };
});