define(function (require) {
  var _ = require('lodash');
  var warn = require('src/modules/d3_components/utils/warn');
  var fail = require('src/modules/d3_components/utils/fail');
  var hasSize = require('src/modules/d3_components/utils/hasSize');
  var allHasSize = require('src/modules/d3_components/utils/allHasSize');

  function isSelection(selection) {
    if (!selection || selection.empty()) {
      warn('A valid reference to a DOM element is required');
      return false;
    }

    if (!hasSize(selection.datum())) {
      warn('No data provided');
      return false;
    }

    return true;
  }

  function getSize(selection, width, height) {
    var node = selection.node().parentNode;
    var size = [
      width || node.clientWidth,
      height || node.clientHeight
    ];

    if (allHasSize(size)) {
      return size;
    } else {
      fail('Expects width, ' + width + ', and height, ' + height +
       ', to be greater than zero.');
    }
  }

  return function getSelectionSize(selection, width, height) {
    if (isSelection(selection)) {
      return getSize(selection, width, height);
    } else {
      fail('An invalid selection was provided');
    }
  };
});
