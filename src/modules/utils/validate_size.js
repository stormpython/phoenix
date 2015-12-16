define(function () {
  return function validateSize(arr) {
    var width = arr[0];
    var height = arr[1];

    if (width <= 0 || height <= 0) {
      throw new Error('Unable to render chart(s), the parent DOM element has no' +
        'width ' + width + ' and/or height ' + height);
    }

    return arr;
  }
});
