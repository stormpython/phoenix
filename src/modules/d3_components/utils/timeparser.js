define(function () {
   /**
    * [timeParser Returns the proper time string from its abbreviated form.]
    * @param  {[String]} str [Abbreviated time string, [0-9][time abbr], e.g. '20s']
    * @return {[String]}     [time notation, e.g. 'second']
    */
  return function timeParser(str) {
    var timeNotation = {
      s: 'second',
      m: 'minute',
      h: 'hour',
      d: 'day',
      w: 'week',
      M: 'month',
      y: 'year'
    };
    var abbr;

    if (typeof str !== 'string') {
      throw new Error('timeParser expects a string as input');
    }

    abbr = str.split(parseFloat(str))[1];

    if (Object.keys(timeNotation).indexOf(abbr) === -1) {
      throw new Error('Invalid time string ' + str);
    }

    return timeNotation[abbr];
  };
});
