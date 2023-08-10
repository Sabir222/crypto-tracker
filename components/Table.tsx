"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCoinStore from "@/context/store";
import watchListStore from "@/context/watchListStore";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface DataProps {
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

interface coinProps {
  email: string;
  symbol: string;
}

const CoinTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(25);
  const [email, setEmail] = useState<String>("");
  const [symbol, setSymbol] = useState("");
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";

  const submitData = async () => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        body: JSON.stringify({
          email,
          symbol,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchWatchCoins();
      }
      console.log(res);
    } catch (err) {
      console.log("unlucky dude", err);
    }
  };
  const deleteData = async () => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        body: JSON.stringify({
          email,
          symbol,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchWatchCoins();
      }
      console.log(res);
    } catch (err) {
      console.log("unlucky dude", err);
    }
  };

  const { coins, fetchCoins } = useCoinStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const { watchCoins, fetchWatchCoins } = watchListStore();

  useEffect(() => {
    fetchWatchCoins();
  }, [fetchWatchCoins]);
  console.log(coins);
  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const sliced = coins.slice(firstCoinIndex, lastCoinIndex);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="p-4 max-w-[1400px] mx-auto flex flex-col  ">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left"></TableHead>
            <TableHead className="text-left">#</TableHead>
            <TableHead className="text-left">Coin</TableHead>
            <TableHead className="text-left">Price</TableHead>
            <TableHead className="text-right">1h%</TableHead>
            <TableHead className="text-right">24h%</TableHead>
            <TableHead className="text-right">7d%</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white">
          {sliced.map((coin: DataProps) => (
            <TableRow key={coin.id}>
              <TableCell className="font-medium">
                {coins.some((c) => c.symbol === coin.symbol) &&
                watchCoins.some((w) => w.symbol === coin.symbol) ? (
                  <button
                    onClick={() => {
                      setSymbol(coin.symbol);
                      setEmail(userEmail);
                      deleteData();
                    }}
                  >
                    <Star size={20} className="text-[#FFD700] " />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSymbol(coin.symbol);
                      setEmail(userEmail);

                      submitData();
                      console.log(coin.symbol);
                    }}
                  >
                    <Star size={20} className="hover:text-[#FFD700] " />
                  </button>
                )}
              </TableCell>
              <TableCell className="font-medium">{coin.cmc_rank}</TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-1">
                  {coin.name}{" "}
                  <span className="text-[8px] text-blue-200">
                    {coin.symbol}
                  </span>
                </div>
              </TableCell>
              <TableCell>${coin.quote.USD.price.toFixed(2)}</TableCell>
              <TableCell
                className={`text-right ${
                  coin.quote.USD.percent_change_1h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                } `}
              >
                {coin.quote.USD.percent_change_1h.toFixed(2)}
              </TableCell>
              <TableCell
                className={`text-right ${
                  coin.quote.USD.percent_change_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                } `}
              >
                {coin.quote.USD.percent_change_24h.toFixed(2)}
              </TableCell>
              <TableCell
                className={`text-right ${
                  coin.quote.USD.percent_change_7d >= 0
                    ? "text-green-500"
                    : "text-red-500"
                } `}
              >
                {coin.quote.USD.percent_change_7d.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${coin.quote.USD.market_cap.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${coin.quote.USD.volume_24h.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-10">
        <Button
          variant="ghost"
          className="flex items-center justify-center w-3 h-6 text-white rounded-sm ring-1 ring-white"
          onClick={() => {
            setCurrentPage(1);
            scrollToTop();
          }}
        >
          1
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-center w-3 h-6 text-white ring-1 ring-white"
          onClick={() => {
            setCurrentPage(2);
            scrollToTop();
          }}
        >
          2
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-center w-3 h-6 text-white ring-1 ring-white"
          onClick={() => {
            setCurrentPage(3);
            scrollToTop();
          }}
        >
          3
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-center w-3 h-6 text-white ring-1 ring-white"
          onClick={() => {
            setCurrentPage(4);
            scrollToTop();
          }}
        >
          4
        </Button>
      </div>
    </main>
  );
};

export default CoinTable;
