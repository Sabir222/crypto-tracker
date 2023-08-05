"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { sign } from "crypto";
import { signIn } from "next-auth/react";

type FormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
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
        SignIcon();
      }
    } catch (error) {
      console.log(error);
    }
    console.log("sent", data);
    signIn();
    reset();
  };
  return (
    <main>
      <div className="mx-auto max-w-[1400px] p-4 flex items-center justify-center h-[100vh] ">
        <div className=" gap-3 md:px-14 px-6 py-10 rounded-md bg-zinc-600 bg-opacity-40 w-[608px] ">
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
              <span className="block text-red-300">{errors.name.message}</span>
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
              <span className="block text-red-300">{errors.email.message}</span>
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
            {/* <div className="flex items-center gap-1 mt-2 mb-4 text-white">
              <Checkbox id="terms" className="bg-white" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div> */}
            <Button variant="outline" type="submit">
              Create Account
            </Button>
            <div className="flex items-center justify-center">
              <p className="mr-2 text-white">You already have an account?</p>
              <Link href="/login">
                <p className="font-bold text-white underline">Sign-In</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
function SignIcon() {
  throw new Error("Function not implemented.");
}
