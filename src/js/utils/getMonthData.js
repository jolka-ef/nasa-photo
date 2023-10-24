export const getMonthData = (date) => {
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const monthNr = date.getMonth() + 1;
  const year = date.getFullYear();
  const weeks = getWeeksStartingMonday(date);

  return { monthName, monthNr, weeks, year };
};

const getFirstSundayDate = (date) => {
  date.setDate(1);
  const weekdayNr = date.getDay();
  return weekdayNr === 0 ? 1 : 1 + 7 - weekdayNr;
};

const getLastDayOfMonthDate = (year, monthNr) =>
  new Date(year, monthNr + 1, 0).getDate();

const getWeeksStartingMonday = (date) => {
  const result = [];

  const firstSundayDate = getFirstSundayDate(date);
  const monthLength = getLastDayOfMonthDate(
    date.getMonth(),
    date.getFullYear()
  );
  const month = [...Array(monthLength).keys()].map((k) => k + 1);

  const firstWeek = month.splice(0, firstSundayDate);

  if (firstWeek.length) {
    result.push([...Array(7 - firstSundayDate), ...firstWeek]);
  }

  for (let index = 0; index < Math.ceil(month.length / 7); index++) {
    const week = month.slice(index * 7, index * 7 + 7);
    result.push(week);
  }

  const lastWeek = result[result.length - 1];

  if (lastWeek.length) {
    result[result.length - 1] = [...lastWeek, ...Array(7 - lastWeek.length)];
  }
  return result;
};
