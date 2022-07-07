const time = require('time-short-string');

/**
 * Date formatting function
 *
 * @param input
 */
 function datef(arg = false) {
  if (!arg.length) arg = false;

  // If arg is numeric, assume it's a unix timestamp
  if (!isNaN(arg) && !isNaN(parseInt(arg))) {
    // Convert to integer to remove floating point
    arg = parseInt(arg);

    // If string has more than 10 characters, interpret it as milliseconds
    if (arg.toString().length <= 10) arg = arg * 1000;
  }

  const dateObj = arg !== false ? new Date(arg) : new Date();

  // Validate date object was able to successfully process input
  try { dateObj.toISOString(); } catch (err) { return { error: true, message: 'Invalid input', arg }; }

  const diff = (new Date() - dateObj) / 1000;
  const milliseconds = +dateObj;
  const seconds = Math.round(milliseconds / 1000)

  return {
    timestamp: Math.round(seconds),
    timestamp_ms: milliseconds,
    loc: dateObj.toLocaleString(),
    loc_std:  [
      [
        dateObj.getFullYear(),
        (dateObj.getMonth() + 1).toString().padStart(2, 0),
        dateObj.getDate().toString().padStart(2, 0),
      ].join('-'),
      [
        dateObj.getHours().toString().padStart(2, 0),
        dateObj.getMinutes().toString().padStart(2, 0),
        dateObj.getSeconds().toString().padStart(2, 0),
        dateObj.getMilliseconds().toString().padStart(3, 0),
      ].join(':'),
    ].join(' '),
    loc_full: dateObj.toString(),
    iso8601: dateObj.toISOString(),
    utc: dateObj.toUTCString(),
    diff:  time(diff),
    diff_:  time(Math.round(diff)),
    diff__:  time(Math.round(diff / 60) * 60),
    diff___:  time(Math.round(diff / 60 / 60) * 60 * 60),
    diff____:  time(Math.round(diff / 60 / 60 / 24) * 60 * 60 * 24),
    diff_s: diff,
  };
}

module.exports = datef;