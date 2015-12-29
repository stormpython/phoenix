define(function (require) {
  var d3 = require('d3');
  var _ = require('lodash');

  return function grid() {
    var gridSize = [500, 500];
    var rowScale = d3.scale.linear();
    var columnScale = d3.scale.linear();

    function layout(data) {
      var rows = Math.ceil(Math.sqrt(data.length));
      var columns = rows;
      var gridCellWidth = gridSize[0] / columns;
      var gridCellHeight = gridSize[1] / rows;
      var cell = 0;
      var newData = [];

      rowScale.domain([0, rows]).range([0, gridSize[1]]);
      columnScale.domain([0, columns]).range([0, gridSize[0]]);

      _.forEach(d3.range(rows), function (row) {
        _.forEach(d3.range(columns), function (col) {
          var datum = data[cell];
          var obj = {
            dx: columnScale(col),
            dy: rowScale(row),
            height: gridCellHeight,
            width: gridCellWidth
          };

          function reduce(a, b) {
            a[b] = datum[b];
            return a;
          }

          if (!datum) { return; }

          // Do not mutate the original data, return a new object
          newData.push(Object.keys(datum).reduce(reduce, obj));
          cell += 1;
        });
      });

      return newData;
    }

    // Public API
    layout.gridSize = function (v) {
      if (!arguments.length) { return gridSize; }
      gridSize = (_.isArray(v) && _.size(v) === 2 && _.all(v, _.isNumber)) ? v : gridSize;
      return layout;
    };

    return layout;
  };
});
