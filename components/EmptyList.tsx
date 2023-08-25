"use client";
import { Button } from "@/components/ui/button";
import Model from "./Modal";
import { useState } from "react";

const EmptyList = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className="mt-[300px]">
      <div className="flex flex-col items-center justify-center mx-auto max-w-[1400px] p-4 gap-4 ">
        <p className="text-xl font-bold text-white"> Your watchist is empty</p>
        <p className="font-light text-center text-white text-md">
          Start by building yours by Clicking on the Button below.
        </p>
        <Button
          variant="outline"
          className="text-white bg-transparent"
          onClick={toggleVisible}
        >
          Add Coin
        </Button>
      </div>
      <div className="">
        {visible && <Model visible={visible} toggleVisible={toggleVisible} />}
      </div>
    </div>
  );
};

export default EmptyList;
