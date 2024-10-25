export function convertCurrency(amount, rate) {
  return amount * rate;
}

export function calculateExchangeRate(baseCurrency, targetCurrency, rates) {
  return rates[targetCurrency].value / rates[baseCurrency].value;
}
