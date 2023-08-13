"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
interface RegisterFormProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const LoginForm = ({ setModalType }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ? "Email or Password incorrect" : "";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main>
      <div className="mx-auto max-w-[1400px] p-4  ">
        <div className="rounded-md bg-slate-700 md:w-[608px]  ">
          <div className="gap-3 px-6 py-10 rounded-md md:px-14 bg-opacity-40">
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <Label
                className="text-2xl font-bold text-center text-white"
                htmlFor="email"
              >
                Sign-In
              </Label>

              <Label className="text-white" htmlFor="email">
                Email
              </Label>

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="text-white bg-transparent"
                placeholder="Email"
              />
              <Label className="text-white" htmlFor="email">
                Password
              </Label>

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="text-white bg-transparent"
                placeholder="Password"
              />
              {error && <span className="text-red-300">{error}</span>}

              <Button variant="outline" type="submit">
                Login
              </Button>
              <div className="flex items-center justify-center">
                <p className="mr-2 text-white">
                  You don&#39;t have an account?
                </p>

                <p
                  className="font-bold text-white underline"
                  onClick={() => setModalType("register")}
                >
                  Create Account
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
