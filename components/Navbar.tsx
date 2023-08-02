"use client";
import { Button } from "@/components/ui/button";
import { ClipboardList, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setNav(!nav);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      navbarRef.current &&
      !(navbarRef.current as HTMLDivElement).contains(e.target as Node)
    ) {
      setNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });
  return (
    <nav className="bg-gray-900">
      <div
        ref={navbarRef}
        className="flex items-center justify-between px-4 py-2 max-w-[1400px] text-white mx-auto "
      >
        <div>
          <p className="text-lg font-light">
            Coint<span className="font-bold">Tracker</span>
          </p>
        </div>
        <div className="">
          <div className="items-center hidden gap-4 md:flex">
            <Button variant="ghost" asChild>
              <Link href="">
                <ClipboardList className="mr-4" />
                WatchList
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="">Sign-In</Link>
            </Button>
            <Button className="text-black" variant="outline" asChild>
              <Link href="">Create Account</Link>
            </Button>
          </div>
          <div className="relative md:hidden">
            <Button variant="ghost" size="icon" asChild className="mr-4">
              <Link href="">
                <ClipboardList />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClick}>
              <Menu />
            </Button>

            <div
              className={`absolute  right-0 w-[200px]  bg-gray-900 flex flex-col gap-4 p-4 ${
                nav ? "flex" : "hidden"
              } `}
            >
              <Button
                className="text-white bg-transparent"
                variant="outline"
                asChild
              >
                <Link href="">Sign-In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="" className="text-black">
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
