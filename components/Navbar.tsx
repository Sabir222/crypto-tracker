"use client";
import { Button } from "@/components/ui/button";
import { ClipboardList, Menu } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const handleClick = () => {
    setNav(!nav);
  };

  const handleVisible = () => {
    setModalType("signin");
    setNav(false);
    setShowRegisterModal(true);
  };
  const handleRegisterVisible = () => {
    setModalType("register");
    setNav(false);
    setShowRegisterModal(true);
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
    <nav className="fixed top-0 w-full bg-gray-900">
      <div
        ref={navbarRef}
        className="flex items-center justify-between px-4 py-2 max-w-[1200px] text-white mx-auto "
      >
        <div>
          <Link href="/">
            <p className="text-lg font-light">
              Coin<span className="font-bold">Tracker</span>
            </p>
          </Link>
        </div>
        <div className="">
          <div className="items-center hidden gap-4 md:flex">
            {session ? (
              <Button variant="ghost" asChild>
                <Link href="/watchlist">
                  <ClipboardList className="mr-4" />
                  WatchList
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleVisible}>
                <ClipboardList className="mr-4" />
                WatchList
              </Button>
            )}

            {session ? (
              <Button variant="ghost" asChild onClick={() => signOut()}>
                <Link href="/">Sign-Out</Link>
              </Button>
            ) : (
              <div>
                <Button
                  className="mr-4"
                  variant="ghost"
                  onClick={handleVisible}
                >
                  Sign-In
                </Button>
                <Button
                  className="text-gray-800"
                  variant="outline"
                  onClick={handleRegisterVisible}
                >
                  Create Account
                </Button>
              </div>
            )}
          </div>
          <div className="relative md:hidden">
            {session ? (
              <Button variant="ghost" size="icon" className="mr-4" asChild>
                <Link href="watchlist">
                  <ClipboardList />
                </Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="mr-4"
                onClick={handleVisible}
              >
                <ClipboardList />
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={handleClick}>
              <Menu />
            </Button>

            <div
              className={`absolute  right-0 w-[200px]  bg-gray-900 flex flex-col gap-4 p-4 ${
                nav ? "flex" : "hidden"
              } `}
            >
              {session ? (
                <Button
                  className="text-white bg-transparent"
                  variant="outline"
                  asChild
                  onClick={() => signOut()}
                >
                  <Link href="/">Sign-Out</Link>
                </Button>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button
                    className="text-white bg-transparent"
                    variant="outline"
                    onClick={handleVisible}
                  >
                    Sign-In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRegisterVisible}
                    className="text-gray-800"
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <SigninModal showModal={showModal} setShowModal={setShowModal} /> */}
      <RegisterModal
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
        modalType={modalType}
        setModalType={setModalType}
      />
    </nav>
  );
};

export default Navbar;
