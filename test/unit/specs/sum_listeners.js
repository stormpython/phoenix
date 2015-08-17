define(function (require) {
  describe("Sum Listener Counts Tests", function () {
    var sumListeners = require("src/components/sum_listeners");
    var fiveItems = {
      click: ["item1"],
      brush: ["item1"],
      mouseover: ["item1", "item2", "item3"]
    };
    var noItems = {};

    it("should return the total listener count", function () {
      var totalListeners = sumListeners(fiveItems);
      chai.assert.equal(totalListeners, 5);
    });

    it("should return 0", function () {
      var totalListeners = sumListeners(noItems);
      chai.assert.equal(totalListeners, 0);
    });
  });
});