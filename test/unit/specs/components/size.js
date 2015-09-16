define(function (require) {
  describe("Size Tests", function () {
    require("jubilee");
    var size = require("src/components/size");
    var fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var defaultWidth = parseInt(fixture.style.width);
    var defaultHeight = parseInt(fixture.style.height);
    var selection;

    beforeEach(function () {
      selection = d3.select(fixture);
    });

    afterEach(function () {
      remove(selection);
      selection = null;
      fixture = null;
    });

    it("should return the client width and height", function () {
      var dimensions = size()(selection);

      chai.assert.equal(dimensions[0], defaultWidth);
      chai.assert.equal(dimensions[1], defaultHeight);
    });

    it("should accept a function", function () {
      var customWidth = function () { return defaultWidth / 2 };
      var customHeight = function () { return defaultHeight / 2 };
      var dimensions = size().width(customWidth).height(customHeight)(selection);

      chai.assert.equal(dimensions[0], customWidth());
      chai.assert.equal(dimensions[1], customHeight());
    });

    it("should accept strings that are valid numbers", function () {
      var customWidth = "200";
      var customHeight = "200";
      var dimensions = size().width(customWidth).height(customHeight)(selection);

      chai.assert.equal(dimensions[0], parseInt(customWidth));
      chai.assert.equal(dimensions[1], parseInt(customHeight));
    });

    it("should accept a number", function () {
      var customWidth = 300;
      var customHeight = 400;
      var dimensions = size().width(customWidth).height(customHeight)(selection);

      chai.assert.equal(dimensions[0], customWidth);
      chai.assert.equal(dimensions[1], customHeight);
    });

    it("should throw an exception with invalid strings", function () {
      var stringWidth = "300px";
      var stringHeight = "500px";

      chai.assert.throw(function () {
        size().width(stringWidth).height(stringHeight)(selection);
      });
    });

    it("should throw an exception when input does not evaluate to a number", function () {
      var inputWidth = true;
      var inputHeight = {};

      chai.assert.throw(function () {
        size().width(inputWidth).height(inputHeight)(selection);
      });
    });
  });
});