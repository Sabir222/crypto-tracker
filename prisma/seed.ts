import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test4@test.com" },
    update: {},
    create: {
      email: "test4@test.com",
      name: "Test4 User",
      password,
      crypto: {
        create: [
          {
            symbol: "BTC",
          },
          {
            symbol: "ETH",
          },
        ],
      },
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
