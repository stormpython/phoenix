define(function (require) {
  var _ = require('lodash');
  var warn = require('src/modules/d3_components/utils/warn');
  var fail = require('src/modules/d3_components/utils/fail');
  var hasSize = require('src/modules/d3_components/utils/hasSize');
  var allHasSize = require('src/modules/d3_components/utils/allHasSize');

  // Returns true if d3 selection is valid with bound datum
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

  /**
   * Returns the size (width, height) of the d3 selection if they are greater
   * than zero, else throws an error. If width and height are not provided,
   * then the client width and height are used.
   */

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

  /**
   * [getSelectionSize Returns an array of width and height values,
   *  e.g. [width, height] if valid d3 selection. If invalid selection, an
   *  error is thrown.]
   * @param  {[d3.selection]} selection [Proper d3 selection]
   * @param  {[Number]} width     [Number describing the d3 selection width]
   * @param  {[Number]} height    [Number describing the d3 selection height]
   * @return {[Array|Error]}           [Returns [width, height] or errors if invalid selection]
   */
  return function getSelectionSize(selection, width, height) {
    if (isSelection(selection)) {
      return getSize(selection, width, height);
    } else {
      fail('An invalid selection was provided');
    }
  };
});
