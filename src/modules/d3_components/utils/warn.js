define(function () {
  /**
   * [warn Returns a warning statment.]
   * @param  {[String]} statement [warning statement]
   * @return {[String]}           [warning logged to the console.]
   */
  return function warn(statement) {
    console.log(['WARNING: ', statement].join(' '));
  };
});
