define(function () {
  return function warn(statement) {
    console.log(["WARNING: ", statement].join(' '));
  };
});
