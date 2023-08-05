import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Options } from "./options";



const handler = NextAuth(Options);
export { handler as GET, handler as POST };
