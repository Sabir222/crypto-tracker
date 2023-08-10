import { prisma } from "@/lib/prisma";
import { Options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(Options);
  const currentUser = session?.user?.email ?? "";
  console.log(currentUser);

  const watchlist = await prisma.cryptolist.findMany({
    where: { userEmail: currentUser },
  });

  return new Response(JSON.stringify(watchlist));
}
