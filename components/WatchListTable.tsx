import fetchData from "@/app/api/cryptoData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const WatchListTable = async () => {
  const data = await fetchData();

  return (
    <main className="p-4 max-w-[1400px] mx-auto">
      <Table>
        <TableCaption>A list of Crypto Currency Prices.</TableCaption>
        <TableHeader>
          <TableRow>
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
          {data.map((coin: DataProps) => (
            <TableRow key={coin.id}>
              <TableCell className="font-medium">{coin.cmc_rank}</TableCell>
              <TableCell>{coin.name}</TableCell>
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
    </main>
  );
};

export default WatchListTable;
