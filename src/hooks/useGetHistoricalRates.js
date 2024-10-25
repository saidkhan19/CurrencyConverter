import { useState, useEffect } from "react";
import { fetchExchangeRateHistory } from "../http";
import { formatToDateString } from "../utils";

const calculateRateReciprocal = (data) => {
  if (!data.results) return;

  for (let i = 0; i < data.results.length; i++) {
    data.results[i].y = 1 / data.results[i].y;
  }
};

const getData = async (baseCurrency, targetCurrency) => {
  const date = formatToDateString(new Date());

  // check session storage
  let data = JSON.parse(sessionStorage.getItem(baseCurrency + targetCurrency));
  if (data && data.date === date) {
    return data;
  }

  data = JSON.parse(sessionStorage.getItem(targetCurrency + baseCurrency));
  if (data && data.date === date) {
    calculateRateReciprocal(data);
    return data;
  }

  // otherwise fetch
  const currency = baseCurrency === "USD" ? targetCurrency : baseCurrency;
  const resData = await fetchExchangeRateHistory(currency);

  // re-structure data
  data = {};
  data.date = date;
  data.results = [];

  if (resData && resData.results) {
    for (let item of resData.results) {
      data.results.push({ x: item.t, y: item.c });
    }
  }

  if (baseCurrency !== "USD") {
    calculateRateReciprocal(data);
  }

  // save to session storage
  sessionStorage.setItem(baseCurrency + targetCurrency, JSON.stringify(data));

  return data;
};

export const useGetHistoricalRates = (baseCurrency, targetCurrency) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        let data;

        if (baseCurrency === "USD" || targetCurrency === "USD") {
          data = await getData(baseCurrency, targetCurrency);
          if (!data.results.length) throw new Error("History is unavailable");
        } else {
          // fetch for both and calculate
          const dataBase = await getData("USD", baseCurrency);
          const dataTarget = await getData("USD", targetCurrency);

          if (!dataBase.results.length || !dataTarget.results.length)
            throw new Error("History is unavailable");

          data = {};
          data.date = dataBase.date;
          data.results = [];

          for (let item of dataTarget.results) {
            const correspondingItem = dataBase.results.find(
              (obj) => obj.x === item.x
            );
            if (correspondingItem) {
              data.results.push({ x: item.x, y: item.y / correspondingItem.y });
            }
          }

          sessionStorage.setItem(
            baseCurrency + targetCurrency,
            JSON.stringify(data)
          );
        }

        setData(data);
        setError(null);
      } catch (error) {
        setError({
          message: error.message || "Failed to get exchange rates",
        });
        setData({});
      }

      setIsLoading(false);
    })();
  }, [baseCurrency, targetCurrency]);

  return { isLoading, error, data };
};
