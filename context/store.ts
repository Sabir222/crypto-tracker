import { create } from "zustand";

const apiEndpoint =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const apiKey = process.env.CMC_PRO_API_KEY;
const headers: HeadersInit = apiKey
  ? {
      "X-CMC_PRO_API_KEY": apiKey,
    }
  : {};

interface CoinDataProps {
  id: number;
  name: string;
}
interface CoinStore {
  coins: CoinDataProps[];
  fetchCoins: () => Promise<void>;
}

const useCoinStore = create<CoinStore>((set) => ({
  coins: [],
  fetchCoins: async () => {
    try {
      const response = await fetch(apiEndpoint, {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Data");
      }
      const data = await response.json();
      const coins = data.data;
      set({ coins });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCoinStore;
