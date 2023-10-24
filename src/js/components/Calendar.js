import React, { useEffect, useState } from "react";
import { createDateString } from "../utils/createDateString.js";
import { getMonthData } from "../utils/getMonthData.js";
import { weekdaysNames } from "../utils/weekdaysNames.js";

import { LeftArrow } from "../icons/LeftArrow.js";
import { RightArrow } from "../icons/RightArrow.js";

export const Calendar = ({ setPhotoDate }) => {
  const today = new Date();
  const [chosenMonth, setChosenMonth] = useState(null);
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const [isSelected, setIsSelected] = useState(null);

  const [{ monthName, monthNr, weeks, year }, setCalendarMonth] = useState(
    getMonthData(today)
  );
  useEffect(() => {
    if (chosenMonth) {
      const data = getMonthData(chosenMonth);
      setCalendarMonth(data);
    }
  }, [chosenMonth]);

  useEffect(() => {
    if (monthNr && year) {
      if (today.getFullYear() === year && today.getMonth() === monthNr - 1) {
        setIsCurrentMonth(true);
      } else {
        setIsCurrentMonth(false);
      }
    }
  }, [monthNr, year]);

  const previousMonth = () => {
    setIsSelected(null);
    const date = new Date(`${year}-${monthNr}-01`);
    date.setMonth(date.getMonth() - 1);
    setChosenMonth(date);
  };

  const nextMonth = () => {
    setIsSelected(null);
    const date = new Date(`${year}-${monthNr}-01`);
    date.setMonth(date.getMonth() + 1);
    setChosenMonth(date);
  };

  return (
    <aside>
      <p className="Page-WelcomeText">
        Discover the cosmos! <br /> Each day a different image or photograph of
        our fascinating universe is featured, along with a brief explanation
        written by a professional astronomer.
      </p>
      <article className="Calendar">
        <header className="Calendar-header">
          <button
            type="button"
            className="Calendar-button"
            aria-label="previous month"
            onClick={previousMonth}
          >
            <LeftArrow />
          </button>
          <h2
            aria-live="polite"
            className="Calendar-heading"
            id="calendar-heading"
          >{`${monthName} ${year}`}</h2>
          <button
            aria-label="next month"
            type="button"
            className={`Calendar-button ${isCurrentMonth ? "IsDisabled" : ""}`}
            disabled={isCurrentMonth ? true : false}
            onClick={nextMonth}
          >
            <RightArrow />
          </button>
        </header>

        <table role="grid" aria-labelledby="calendar-heading">
          <thead>
            <tr>
              {weekdaysNames.map((day) => (
                <th scope="col" abbr={day.name}>
                  {day.abbreviation}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => (
              <tr key={index}>
                {week.map((day, index) => {
                  const isClickable =
                    new Date() - new Date(`${year}-${monthNr}-${day}`) > 0;
                  return day ? (
                    <td
                      className={`${!isClickable ? "IsDisabled " : ""} ${
                        isSelected === day ? "IsSelected " : ""
                      }Calendar-date`}
                      key={index}
                      onClick={
                        isClickable
                          ? () => {
                              setIsSelected(day);
                              setPhotoDate(
                                createDateString(day, monthNr, year)
                              );
                            }
                          : null
                      }
                      tabIndex={isSelected === day ? 0 : -1}
                    >
                      {day}
                    </td>
                  ) : (
                    <td className="disabled" tabIndex="-1"></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </aside>
  );
};
