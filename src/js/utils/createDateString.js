export const createDateString = (day, monthNr, year) => {
  return `${year}-${monthNr
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};
