import { prisma } from "@/lib/prisma";
import { Options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getServerSession(Options);
  const currentUser = session?.user?.email ?? "";
  console.log(currentUser);

  const watchlist = await prisma.cryptolist.findMany({
    where: { userEmail: currentUser },
  });

  return new Response(JSON.stringify(watchlist));
}
export async function POST(req: Request) {
  const { email, symbol } = await req.json();

  const cryptolist = await prisma.cryptolist.create({
    data: {
      symbol,
      userEmail: email,
    },
  });
  return NextResponse.json(cryptolist);
}

export async function DELETE(req: Request) {
  const { email, symbol } = await req.json();
  if (!symbol) return NextResponse.json({ message: "symbol is required" });
  const cryptolist = await prisma.cryptolist.deleteMany({
    where: {
      symbol: symbol,
      userEmail: email,
    },
  });
  return NextResponse.json(cryptolist);
}
