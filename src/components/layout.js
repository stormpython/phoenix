/**
 * Returns a configurable function that sets attributes on
 * data objects to create a layout for chart(s).
 * Available layouts => 'rows', 'columns', 'grid'
 */
define(function (require) {
  var jee = require("jubilee");

  return function layout() {
    var cssClass = "chart";
    var type = "rows";
    var size = [500, 500];

    function component(selection) {
      selection.each(function (data) {
        // Appends divs based on the data array
        var layout = jee.layout.base().type(type).size(size);
        var div = d3.select(this).selectAll("divs")
          .data(layout(data));

        // Exit
        div.exit().remove();

        // Enter
        div.enter().append("div");

        // Update
        div
          .attr("class", cssClass)
          .style("position", "absolute")
          .style("left", function (d) {
            return d.dx + "px";
          })
          .style("top", function (d) {
            return d.dy + "px";
          })
          .style("width", function (d) {
            return d.width + "px";
          })
          .style("height", function (d) {
            return d.height + "px";
          });
      });

      return selection;
    }

    // Sets css class on div(s)
    component.cssClass = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return component;
    };

    // Layout types => 'rows', 'columns', 'grid'
    component.layout = function (_) {
      if (!arguments.length) return type;
      type = _;
      return component;
    };

    // Parent element size, [width, height]
    component.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return component;
    };

    return component;
  };
});