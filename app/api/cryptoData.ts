// Define the API endpoint and headers
const apiEndpoint =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const apiKey = "c46ba785-7ffd-492e-b554-bd9c302dfad9";
const headers = {
  "X-CMC_PRO_API_KEY": apiKey,
};

export interface CoinDataProps {
  id: number;
  name: string;
}

async function fetchData() {
  const response = await fetch(apiEndpoint, {
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  const data = await response.json();
  return data.data;
}

// fetchData();

export default fetchData;
