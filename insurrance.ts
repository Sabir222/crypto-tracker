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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ModelProps {
  visible: boolean;
  toggleVisible: () => void;
}
const Model: React.FC<ModelProps> = ({ toggleVisible }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { coins, fetchCoins } = useCoinStore();
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  console.log(coins);
  

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
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select A Coin..."}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
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
              <button className="px-5 py-1 mt-4 text-gray-900 bg-white rounded-md">
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
