import { Options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

const Test = async () => {
  const session = await getServerSession(Options);
  const sessionId = session?.user?.email;
  
  return <div className="text-white">{JSON.stringify(sessionId)}</div>;
};

export default Test;
