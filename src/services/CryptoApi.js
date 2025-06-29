const BASE_URL = "https://api.coingecko.com/api/v3/";
const API_KEY = "CG-BHBgZZ2Gm7hqeseDH8ZWiGbX";
const getCoinList = () => {
  return `${BASE_URL}coins/markets?vs_currency=euro&x_cg_demo_api_key=${API_KEY}`;
};
const getCoinById = (id) => {
  return `${BASE_URL}coins/${id}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`;
};
export { getCoinList, getCoinById };
