export function formatToDateString(date) {
  return date.toISOString().split("T")[0];
}

export function getPrevDate(daysBack) {
  return new Date(new Date() - 1000 * 60 * 60 * 24 * daysBack);
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
