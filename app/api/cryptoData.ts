const apiEndpoint =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

async function fetchData() {
  const response = await fetch(`http://localhost:3000/api/datafetch`, {
    cache: "no-cache",
    next: {
      revalidate: 15,
    },
  });
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  const data = await response.json();
  return data.data.data;
}

// fetchData();

export default fetchData;
