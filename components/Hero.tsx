import { Switch } from "@/components/ui/switch";

const Hero = () => {
  return (
    <main>
      <div className="px-4 max-w-[1400px] mx-auto text-white">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">
              Todays Cryptocurrency Prices by Market Cap
            </p>
            <p className="font-light">
              The global crypto market cap is $1.17T, a 0.65% decrease over the
              last day.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="" className="font-light">
              Highlights
            </label>
            <Switch />
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default Hero;
