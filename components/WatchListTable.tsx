"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import useCoinStore from "@/context/store";
import watchListStore from "@/context/watchListStore";
import { log } from "console";
import { watch } from "fs";
import { useEffect, useState } from "react";
import EmptyList from "./EmptyList";
import { Button } from "./ui/button";
import { Loader2, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Model from "./Model";
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
const logoUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/";

const WatchListTable = () => {
  const [symbol, setSymbol] = useState("");
  const { coins, fetchCoins } = useCoinStore();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { watchCoins, fetchWatchCoins } = watchListStore();
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  const { toast } = useToast();

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  const userEmail = session?.user?.email || "";

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    fetchWatchCoins();
  }, [fetchWatchCoins]);
  const filteredCoins = coins.filter((coin: DataProps) =>
    watchCoins.some((watchCoin) => watchCoin.symbol === coin.symbol)
  );

  //       SUBMIT Data           //
  const submitData = async (symbol: string) => {
    setIsLoading(symbol);

    setSymbol(symbol);
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          symbol,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        // setSymbol("");

        fetchWatchCoins();
        setIsLoading(null);
        toast({
          description: "Coin Added to watch list",
        });
      }

      console.log(res);
    } catch (err) {
      console.log("unlucky dude", err);
      setIsLoading(null);
    }
  };
  //         DELETE Data          //
  const deleteData = async (symbol: string) => {
    setSymbol(symbol);
    setIsLoading(symbol);

    try {
      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        body: JSON.stringify({
          email: userEmail,
          symbol,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        // setSymbol("");

        fetchWatchCoins();
        setIsLoading(null);
        toast({
          description: "Coin Deleted  from watch list",
        });
      }
      console.log(res);
    } catch (err) {
      console.log("unlucky dude", err);
      setIsLoading(null);
    }
  };

  return (
    <main className="p-4 max-w-[1200px] mx-auto flex flex-col  ">
      {filteredCoins.length === 0 ? (
        <EmptyList />
      ) : (
        <div className="mt-[70px]">
          <Button
            className="text-white bg-transparent "
            variant="outline"
            onClick={toggleVisible}
          >
            ADD Coin
          </Button>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left"></TableHead>
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
            <TableBody className="text-white ">
              {filteredCoins.map((coin: DataProps) => (
                <TableRow key={coin.id}>
                  <TableCell className=" font-medium w-[40px]">
                    {isLoading === coin.symbol ? (
                      <Loader2 size={20} className=" animate-spin" />
                    ) : coins.some((c) => c.symbol === coin.symbol) &&
                      watchCoins.some((w) => w.symbol === coin.symbol) ? (
                      <button
                        onClick={() => {
                          // setSymbol(coin.symbol);
                          // setEmail(userEmail);
                          deleteData(coin.symbol);
                        }}
                      >
                        <Star size={20} className="text-[#FFD700] " />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // setEmail(userEmail);

                          submitData(coin.symbol);
                        }}
                      >
                        <Star size={20} className="hover:text-[#FFD700] " />
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="font-medium ">
                    <div className="min-w-[20px]">
                      <Image
                        width={20}
                        height={20}
                        alt="logo"
                        loading="lazy"
                        layout="intrinsic"
                        src={`${logoUrl}${coin.id}.png`}
                      />
                    </div>
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
        </div>
      )}
      <div>
        {visible && <Model visible={visible} toggleVisible={toggleVisible} />}
      </div>
    </main>
  );
};

export default WatchListTable;
