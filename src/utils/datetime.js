import dayjs from 'dayjs';

/* constants */

// https://day.js.org/docs/en/parse/string-format
const defaultDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

/* end of constants */

/* public functions */

export const currentDateTimeString = (format = defaultDateTimeFormat) => {
  return formatDateTimeString(dayjs());
};

export const formatDateTimeString = (
  datetime,
  format = defaultDateTimeFormat
) => {
  return datetime.format(format);
};

export const compareForDatesAscending = (date1, date2) => {
  return convertStrToDate(date1) - convertStrToDate(date2);
};

export const compareForDatesDescending = (date1, date2) => {
  return convertStrToDate(date2) - convertStrToDate(date1);
};

/* end of public functions */

/* private functions */

// convert yyyy-mm-dd to UTC
const convertStrToDate = str => {
  return Date.parse(str);
};

/* end of private functions */
