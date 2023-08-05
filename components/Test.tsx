import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Test = async () => {
  const session = await getServerSession(authOptions);
  return <div className="text-white">{JSON.stringify(session)}</div>;
};

export default Test;
