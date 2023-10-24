import { useEffect, useState } from "react";
import axios from "axios";

export const useDataAPI = (urlRequest) => {
  const [url, setUrl] = useState(urlRequest);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;
    const cachedResponse = localStorage.getItem(url);
    const doFetch = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await axios(url);
        setData(result.data);
        localStorage.setItem(url, JSON.stringify(result.data));
      } catch (error) {
        setIsError(error.message);
        console.log(error.toJSON());
      }
      setIsLoading(false);
    };

    if (cachedResponse) {
      setData(JSON.parse(cachedResponse));
    } else {
      doFetch();
    }
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
