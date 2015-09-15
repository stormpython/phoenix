define(function (require) {
  describe("Phoenix API Tests", function () {
    require("jubilee");
    var Phx = require("phx");
    var fixture = require("fixtures/fixture");
    var data = [
      {
        data: [
          [{ x: 1411761450000, y: 101 }]
        ]
      },
      {
        data: [
          [{ x: 1411761450000, y: 91 }]
        ]
      }
    ];
    var viz;

    beforeEach(function () {
      viz = new Phx(fixture);
    });

    afterEach(function () {
      viz.destroy();
    });

    it("should be an object", function () {
      chai.assert.isObject(viz);
    });

    describe("element API", function () {
      it("should throw an exception", function () {
        chai.assert.throws(function () {
          new Phx(null);
        });
      });

      it("should save DOM properties to viz object", function () {
        chai.assert.deepEqual(viz._el, fixture);
        chai.assert.deepEqual(viz._selection, d3.select(fixture))
      });

      it("should return DOM element", function () {
        chai.assert.deepEqual(viz.element(), fixture);
      });
    });

    describe("data API", function () {
      var badData = [1, 2, 3];
      var data = [{}, {}];

      it("should throw an exception", function () {
        [badData, {}, 1, true, "false"].forEach(function (val) {
          chai.assert.throws(function () {
            viz.data(val);
          });
        });
      });

      it("should save data to viz object and d3 selection", function () {
        viz.data(data);

        chai.assert.deepEqual(viz._datum, data);
        chai.assert.deepEqual(viz._selection.datum(), data);
      });

      it("should return an empty array", function () {
        chai.assert.deepEqual(viz.data(), []);
      });

      it("should return the data array", function () {
        viz.data(data);
        chai.assert.deepEqual(viz.data(), data);
      });
    });

    describe("options API", function () {
      var options = {type: "line"};

      it("should throw an exception", function () {
        [["1", "2"], 3, false, "string"].forEach(function (opts) {
          chai.assert.throws(function () {
            viz.options(opts);
          });
        });
      });

      it("should save the options to viz object", function () {
        viz.options(options);
        chai.assert.deepEqual(viz._opts, options);
      });

      it("should return an empty object", function () {
        chai.assert.deepEqual(viz.options(), {});
      });

      it("should return the options", function () {
        viz.options(options);
        chai.assert.deepEqual(viz.options(), options);
      });
    });

    describe("set API", function () {
      it("should set values for options", function () {
        viz.set("layout", "grid");
        chai.assert.equal(viz.options().layout, "grid");
      });
    });

    describe("get API", function () {
      it("should return option values", function () {
        var options = {layout: "columns"};
        viz.options(options);
        chai.assert.equal(viz.get("layout"), options.layout);
      });
    });

    describe("draw & resize APIs", function () {
      beforeEach(function () {
        viz.data([{}, {}]);
      });

      afterEach(function () {
        viz.element(fixture);
      });

      it("should throw an exception", function () {
        chai.assert.throws(function () {
          viz.draw()
        });
      });

      //it("should not draw a chart", function () {
      //  fixture.style.width = "0px";
      //  fixture.style.height = "0px";
      //  viz.element(fixture).data([{}, {}]).draw();
      //
      //  // Contains no child nodes
      //  chai.assert.equal(viz.element().children.length, 0);
      //});
      //
      //it("should draw chart(s)", function () {
      //
      //});
    });

    describe("remove API", function () {
      beforeEach(function () {
        viz.data(data);
      });

      afterEach(function () {
        viz.remove();
      });

      it("should remove child nodes", function () {
        viz.draw().remove();
        chai.assert.equal(viz.element().children.length, 0);
      });

      it("should not remove parent node", function () {
        chai.assert.isDefined(viz.element());
      });
    });

    describe("destroy API", function () {
      var listenerFunction = function () {};

      beforeEach(function () {
        viz.data(data)
          .on("click", listenerFunction)
          .on("brush", listenerFunction)
          .draw();
      });

      afterEach(function () {
        viz = new Phx(fixture);
      });

      it("should remove all listeners", function () {
        viz.destroy();
        chai.assert.equal(viz.activeEvents().length, 0);
      });

      it("should remove child nodes from parent", function () {
        viz.destroy();
        var children = d3.selectAll(".chart");
        chai.assert.isNull(children.node());
      });

      it("should set the parent node to null", function () {
        viz.destroy();
        var parent = viz.element();
        var parentSelection = viz._selection;

        chai.assert.isNull(parent);
        chai.assert.isNull(parentSelection);
      });

      it("should set listeners to an empty object", function () {
        viz.destroy();
        var listeners = viz._listeners;

        chai.assert.deepEqual(listeners, {});
      });

      it("should set all other values to null", function () {
        viz.destroy();
        var nullValues = [
          "_chart",
          "_chartClass",
          "_datum",
          "_el",
          "_layout",
          "_opts",
          "_selection"
        ];

        nullValues.forEach(function (attr) {
          chai.assert.isNull(viz[attr]);
        });
      });
    });

    describe("on API", function () {
      var noop = function () {};

      beforeEach(function () {
        viz.element(fixture).data(data);
      });

      afterEach(function () {
        viz.remove();
      });

      it("should throw an exception", function () {
        viz._selection = null;
        chai.assert.throws(function () {
          viz.on("click", noop);
        }, "A valid element is required");
      });

      it("should add event to listeners object", function () {
        viz.on("click", noop);
        chai.assert.property(viz._listeners, "click");
      });
    });

    describe("off API", function () {
      var noop = function () {};
      var noop1 = function () {};

      beforeEach(function () {
        viz.element(fixture).data(data)
          .on("click", noop)
          .on("click", noop1);
      });

      afterEach(function () {
        viz.remove();
      });

      it("should throw an exception", function () {
        viz._selection = null;
        chai.assert.throws(function () {
          viz.off("click", noop);
        });
      });

      it("should remove the listener function", function () {
        viz.off("click", noop1);
        var listenerCount = viz.listenerCount("click");
        chai.assert.equal(listenerCount, 1);
      });

      it("should remove all listeners", function () {
        var listenerCount;

        viz.off("click");
        listenerCount = viz.listenerCount("click");

        chai.assert.equal(listenerCount, 0);
      });
    });

  });
});