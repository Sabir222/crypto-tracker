import { create } from "zustand";

interface CoinDataProps {
  name: string;
  id: number;

  symbol: string;
  price: number;
  cmc_rank: number;
  quote: {
    USD: {
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      volume_24h: number;
      price: number;
    };
  };
}
interface CoinStore {
  coins: CoinDataProps[];
  fetchCoins: () => Promise<void>;
}

const useCoinStore = create<CoinStore>((set) => ({
  coins: [],
  fetchCoins: async () => {
    try {
      const response = await fetch("/api/datafetch");
      if (!response.ok) {
        throw new Error("Failed to fetch Data");
      }
      const data = await response.json();
      // const coins = data;
      set({ coins: data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCoinStore;
