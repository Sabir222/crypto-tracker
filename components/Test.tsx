import { Options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Test = async () => {
  const session = await getServerSession(Options);
  return <div className="text-white">{session ? "hi" : "no"}</div>;
};

export default Test;
