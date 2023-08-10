import { create } from "zustand";

interface WatchCoinDataProps {
  id: number;
  symbol: string;
  userEmail: String;
}
interface watchProps {
  watchCoins: WatchCoinDataProps[];
  fetchWatchCoins: () => Promise<void>;
}

const watchListStore = create<watchProps>((set) => ({
  watchCoins: [],
  fetchWatchCoins: async () => {
    try {
      const response = await fetch("/api/watchlist");
      if (!response.ok) {
        throw new Error("Failed to fetch Data");
      }
      const data = await response.json();
      console.log("aoihiaoshasoahsaoshaushsuah", data);

      const watchCoins = data;
      set({ watchCoins });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default watchListStore;
