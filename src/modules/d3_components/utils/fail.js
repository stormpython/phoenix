define(function () {
  /**
   * [fail Throws an error with the provided statement]
   * @param  {[String]} statement [error statment]
   * @return {[Error]}           [error]
   */
  return function fail(statement) {
    throw new Error(statement);
  };
});
