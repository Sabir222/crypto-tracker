"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { X } from "lucide-react";
interface SigninModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigninModal = ({ showModal, setShowModal }: SigninModalProps) => {
  const handleVisible = () => setShowModal(false);

  return (
    <main
      className={`fixed top-0 ${
        showModal ? "flex" : "hidden"
      } bottom-0 left-0 right-0 flex items-center justify-center bg-black/70`}
      onClick={handleVisible}
    >
      <div className="relative">
        <button
          className="absolute text-white top-8 right-10"
          onClick={handleVisible}
        >
          <X />
        </button>
        <LoginForm />
      </div>
    </main>
  );
};

export default SigninModal;
