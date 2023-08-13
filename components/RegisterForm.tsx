"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type FormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface LoginFormProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm = ({ setModalType }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const schema: ZodType<FormProps> = z
    .object({
      name: z.string().min(2, "Name must contain at leat 2 characters").max(30),
      email: z.string().min(2),
      password: z
        .string()
        .min(5, "Password is too short , atleat 5 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });
  const submitData = async (data: FormProps) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      }
    } catch (error) {
      console.log(error);
    }
    console.log("sent", data);
    reset();
  };
  return (
    <main>
      <div className="mx-auto max-w-[1400px] p-4  ">
        <div className="bg-slate-700 sm:w-[608px] rounded-md">
          <div className="gap-3 px-10 py-10 rounded-md bg-opacity-40">
            <form
              onSubmit={handleSubmit(submitData)}
              className="flex flex-col gap-3"
            >
              <Label
                className="text-2xl font-bold text-center text-white"
                htmlFor="email"
              >
                Create Account
              </Label>
              <Label className="mt-5 text-white" htmlFor="email">
                Name
              </Label>
              {errors.name && (
                <span className="block text-red-300">
                  {errors.name.message}
                </span>
              )}
              <Input
                {...register("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white bg-transparent"
                placeholder="Name"
              />
              <Label className="text-white" htmlFor="email">
                Email
              </Label>
              {errors.email && (
                <span className="block text-red-300">
                  {errors.email.message}
                </span>
              )}
              <Input
                {...register("email")}
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
              {errors.password && (
                <span className="block text-red-300">
                  {errors.password.message}
                </span>
              )}
              <Input
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="text-white bg-transparent"
                placeholder="Password"
              />
              <Label className="text-white" htmlFor="email">
                Confirm Password
              </Label>
              {errors.confirmPassword && (
                <span className="block text-red-300">
                  {errors.confirmPassword.message}
                </span>
              )}
              <Input
                {...register("confirmPassword")}
                type="password"
                id="confirmpassword"
                className="text-white bg-transparent"
                placeholder="Password"
              />
              <Button variant="outline" type="submit">
                Create Account
              </Button>
              <div className="flex items-center justify-center">
                <p className="mr-2 text-white">You already have an account?</p>

                <button
                  className="font-bold text-white underline"
                  onClick={() => setModalType("signin")}
                >
                  Sign-In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
