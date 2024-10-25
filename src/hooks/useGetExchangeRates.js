import { useState, useEffect } from "react";
import { fetchExchangeRates } from "../http";
import { formatToDateString } from "../utils";

export const useGetExchangeRates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    (async function () {
      const date = formatToDateString(new Date());
      const sessionData = JSON.parse(sessionStorage.getItem("rates"));

      if (sessionData && sessionData[date]) {
        setData(sessionData[date]);
      } else {
        try {
          const data = await fetchExchangeRates();

          sessionStorage.setItem(
            "rates",
            JSON.stringify({
              [date]: data,
            })
          );

          setData(data);
          setError(null);
        } catch (error) {
          setError({
            message: error.message || "Failed to get exchange rates.",
          });
        }
      }

      setIsLoading(false);
    })();
  }, []);

  return { isLoading, error, data };
};
