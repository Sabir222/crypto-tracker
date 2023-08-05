import { Button } from "@/components/ui/button";
const EmptyList = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center mx-auto max-w-[1400px] p-4 gap-4 h-[100vh]">
        <p className="text-xl font-bold text-white"> Your watchist is empty</p>
        <p className="font-light text-white text-md">
          Start by building yours by Clicking on the Button below{" "}
        </p>
        <Button variant="outline" className="text-white bg-transparent">
          Outline
        </Button>
      </div>
    </div>
  );
};

export default EmptyList;
