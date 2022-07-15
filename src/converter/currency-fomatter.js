export const currencyFomatter = (prices) => {
  if (prices) {
    return prices.toLocaleString("it-IT") + "đ"
  }
  return "0đ"
};