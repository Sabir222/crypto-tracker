"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import useCoinStore from "@/context/store";
import { log } from "console";
import { useSession } from "next-auth/react";
import watchListStore from "@/context/watchListStore";

interface ModelProps {
  visible: boolean;
  toggleVisible: () => void;
}
const Model: React.FC<ModelProps> = ({ toggleVisible }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Select a Coin ...");
  const [symbol, setSymbol] = useState("");
  const { data: session } = useSession();

  const userEmail = session?.user?.email || "";
  const upValue = value.toLocaleUpperCase();
  const { coins, fetchCoins } = useCoinStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const { watchCoins, fetchWatchCoins } = watchListStore();

  useEffect(() => {
    fetchWatchCoins();
  }, [fetchWatchCoins]);
  const frameworks = coins.map((coin) => ({
    value: coin.symbol,
    label: coin.symbol,
  }));
  const submitData = async () => {
    setSymbol(value.toUpperCase());
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
        fetchWatchCoins();
      }
      console.log(res);
    } catch (err) {
      console.log("unlucky dude", err);
    }
  };
  console.log(value.toUpperCase());

  return (
    <>
      <main className="absolute top-0 bottom-0 left-0 right-0 bg-black/40 ">
        <div className="flex items-center justify-center h-[100vh] ">
          <div className="bg-gray-900 h-[300px]  p-4 flex justify-center items-center rounded-2xl relative">
            <div className="absolute text-lg font-bold text-white top-4 right-6">
              <button onClick={toggleVisible}>X</button>
            </div>
            <div className="flex flex-col text-gray-900 ">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value}

                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] h-[210px] p-0">
                  <Command>
                    <CommandInput placeholder="Search for Coins..." />
                    <CommandEmpty>No Coin found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <button
                className="px-5 py-1 mt-4 text-gray-900 bg-white rounded-md"
                onClick={() => submitData()}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Model;
