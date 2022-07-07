const time = require('time-short-string');

/**
 * Date formatting function
 *
 * @param input
 */
 function datef(arg = false) {
  // if arg is empty, force it to get current timestamp
  if (!arg.length) arg = false;

  // If arg is numeric, assume it's a unix timestamp
  if (!isNaN(arg) && !isNaN(parseInt(arg))) {
    arg = parseInt(arg);
    // If string has more than 10 characters, interpret it as milliseconds
    if (arg.toString().length <= 10) arg = arg * 1000;
  }

  const date = arg !== false ? new Date(arg) : new Date();
  try { date.toISOString(); } catch (err) { return { error: true, message: 'Invalid input', arg }; }
  const diff = (new Date() - date) / 1000;
  const milliseconds = +date;
  const seconds = Math.round(milliseconds / 1000)

  return {
    timestamp: Math.round(seconds),
    timestamp_ms: milliseconds,
    loc:  [
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getDate().toString().padStart(2, 0),
      ].join('-'),
      [
        date.getHours().toString().padStart(2, 0),
        date.getMinutes().toString().padStart(2, 0),
        date.getSeconds().toString().padStart(2, 0),
        date.getMilliseconds().toString().padStart(3, 0),
      ].join(':'),
    ].join(' '),
    utc: date.toISOString().replace(/[TZ]/g, ' ').trim(),
    iso8601: date.toISOString(),
    loc_str: date.toLocaleString(),
    loc_str_ext: `${date.toDateString()} ${date.toTimeString()}`,
    diff:  time(diff),
    diff_:  time(Math.round(diff)),
    diff__:  time(Math.round(diff / 60) * 60),
    diff___:  time(Math.round(diff / 60 / 60) * 60 * 60),
    diff____:  time(Math.round(diff / 60 / 60 / 24) * 60 * 60 * 24),
    diff_s: diff,
  };
}

module.exports = datef;