import { formatToDateString, getPrevDate } from "./utils";

export async function fetchExchangeRates() {
  const response = await fetch(
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_0FfOzJDg4iT0mNsjdxeAYgPMDPyIoFuTaBaWrbWh"
  );
  const resData = await response.json();

  console.log(resData);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates.");
  }

  return resData.data;
}

export async function fetchExchangeRateHistory(targetCurrency) {
  let date = new Date();
  let prevDate = getPrevDate(90);

  const dateTo = formatToDateString(date);
  const dateFrom = formatToDateString(prevDate);

  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/C:USD${targetCurrency}/range/1/day/${dateFrom}/${dateTo}?apiKey=OBkPJdqD2IaPdFT5zdvM76oNuY6Y4rcg`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch exchange history.");
  }

  return resData;
}
