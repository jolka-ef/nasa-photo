import React, { useEffect, useState } from "react";
import { useDataAPI } from "./js/logic/fetchData.js";

import { Calendar } from "./js/components/Calendar.js";
import { PhotoOfADay } from "./js/components/PhotoOfADay.js";

const KEY = "";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${KEY}`;

export const App = () => {
  const [photoDate, setPhotoDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  let [{ data, isLoading, isError }, doFetch] = useDataAPI("");
  useEffect(() => {
    const run = async () => {
      await doFetch(`${API_URL}&date=${photoDate}`);
    };
    run();
  }, [photoDate]);
  return (
    <>
      <h1 className="Page-heading">Astronomy Picture of the Day </h1>
      <Calendar setPhotoDate={setPhotoDate} />
      {isLoading && <p className="Message  Message-isBlinking ">is loading</p>}
      {isError && (
        <p className="Message">
          <span className="IsBlinking">404 </span>The cosmic object you are
          looking for has disappeared beyond the event horizon.
        </p>
      )}
      {!isLoading && !isError && data && <PhotoOfADay data={data} />}
    </>
  );
};
