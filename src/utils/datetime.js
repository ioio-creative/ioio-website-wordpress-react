// convert yyyy-mm-dd to UTC
function convertStrToDate(str) {
    return Date.parse(str);
}

function compareForDatesAscending(date1, date2) {
    return convertStrToDate(date1) - convertStrToDate(date2);
}

function compareForDatesDescending(date1, date2) {
    return convertStrToDate(date2) - convertStrToDate(date1);
}

export {
    compareForDatesAscending,
    compareForDatesDescending
}