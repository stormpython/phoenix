define(function (require) {
  var Phx = require("phx");
  var fixture = require("fixtures/fixture");
  var chart;

  describe("Phoenix Tests", function () {
    beforeEach(function () {
      chart = new Phx(fixture);
    });

    afterEach(function () {
      chart.destroy();
      chart = null;
    });

    it("should support current APIs", function () {
      chai.assert.isFunction(Phx);
      chai.assert.isFunction(chart.element);
      chai.assert.isFunction(chart.data);
      chai.assert.isFunction(chart.options);
      chai.assert.isFunction(chart.set);
      chai.assert.isFunction(chart.get);
      chai.assert.isFunction(chart.draw);
      chai.assert.isFunction(chart.resize);
      chai.assert.isFunction(chart.remove);
      chai.assert.isFunction(chart.destroy);
      chai.assert.isFunction(chart.on);
      chai.assert.isFunction(chart.off);
    });
  });
});