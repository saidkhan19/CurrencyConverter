import { useState } from "react";

import "./App.css";
import Menu from "./components/Menu";
import Converter from "./components/Converter";
import Rates from "./components/Rates";
import Info from "./components/Info";
import { useGetExchangeRates } from "./hooks/useGetExchangeRates";

function App() {
  const [page, setPage] = useState("converter");

  const [selectedCurrencies, setSelectedCurrencies] = useState({
    baseCurrency: "USD",
    currency: "EUR",
  });
  const [value, setValue] = useState("");
  const [selectedChartValue, setSelectedChartValue] = useState(30);

  const { isLoading, error, data } = useGetExchangeRates();

  let content;

  if (page === "converter") {
    content = (
      <Converter
        isLoading={isLoading}
        error={error}
        data={data}
        value={value}
        setValue={setValue}
        selectedChartValue={selectedChartValue}
        setSelectedChartValue={setSelectedChartValue}
        selectedCurrencies={selectedCurrencies}
        setSelectedCurrencies={setSelectedCurrencies}
      />
    );
  } else if (page === "rates") {
    content = <Rates isLoading={isLoading} error={error} data={data} />;
  } else if (page === "info") {
    content = <Info />;
  }

  return (
    <>
      <Menu active={page} onChange={setPage} />
      <main className="container">{content}</main>
    </>
  );
}

export default App;
