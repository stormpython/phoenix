define(function (require) {
  describe("Layout Tests", function () {
    var layout = require("src/components/layout");
    var fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var testLayout;

    beforeEach(function () {
      testLayout = layout();
    });

    afterEach(function () {
      testLayout = null;
    });

    describe("Function tests", function () {
      it("should return a function", function () {
        chai.assert.isFunction(layout());
      });
    });

    describe("API tests", function () {
      it("should set the css class", function () {
        var klass = "test";
        testLayout.class("test"); // set css class

        chai.assert.equal(testLayout.class(), klass);
      });

      it("should set the layout type", function () {
        var type = "grid";
        testLayout.layout(type);

        chai.assert.equal(testLayout.layout(), type);
      });

      it("should set the layout size", function () {
        var size = [250, 750];
        testLayout.size(size);

        chai.assert.deepEqual(testLayout.size(), size);
      });
    });

    describe("DOM tests", function () {
      var data = [{}, {}, {}];
      var selection;

      beforeEach(function () {
        selection = d3.select(fixture).datum(data);
        testLayout = layout();
      });

      afterEach(function () {
        remove(selection);
        testLayout = null;
        selection = null;
      });

      it("should set the css class", function () {
        var klass = "test";
        selection.call(testLayout.class(klass));

        selection.selectAll("." + testLayout.class())
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), klass);
          });
      });

      it("should set dimension values on the data object", function () {
        ["rows", "grid", "columns"].forEach(function (layout) {
          selection.call(testLayout.layout(layout));

          selection.selectAll("." + testLayout.class())
            .each(function (d) {
              chai.assert.property(d, "dx");
              chai.assert.property(d, "dy");
              chai.assert.property(d, "width");
              chai.assert.property(d, "height");
            });
        });
      });

      it("should set the DOM dimensions", function () {
        ["rows", "grid", "columns"].forEach(function (layout) {
          var dims = [350, 550];
          selection.selectAll("*").remove();
          selection.call(testLayout.layout(layout).size(dims));

          selection.selectAll("." + testLayout.class())
            .each(function () {
              if (layout === "rows") {
                chai.assert.equal(this.clientWidth, dims[0]);
                chai.assert.isBelow(this.clientHeight, dims[1]);
              }

              if (layout === "grid" && data.length > 2) {
                chai.assert.isBelow(this.clientWidth, dims[0]);
                chai.assert.isBelow(this.clientHeight, dims[1]);
              }

              if (layout === "columns") {
                chai.assert.isBelow(this.clientWidth, dims[0]);
                chai.assert.equal(this.clientHeight, dims[1]);
              }
            });
        });
      });
    });
  });
});