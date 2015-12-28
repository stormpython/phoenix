define(function () {
  return function fail(statement) {
    throw new Error(statement);
  };
});
