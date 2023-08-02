import fetchData from "@/app/api/cryptoData";

interface DataProps {
  name: string;
  id: number;
}

const Test = async () => {
  const data = await fetchData();
  return (
    <div>
      <ul className="text-white">
        {data.map((coin: DataProps) => {
          return <li key={coin.id}>{coin.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Test;
