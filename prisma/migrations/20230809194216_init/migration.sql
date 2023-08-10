-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cryptolist" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptolist_symbol_userEmail_key" ON "Cryptolist"("symbol", "userEmail");

-- AddForeignKey
ALTER TABLE "Cryptolist" ADD CONSTRAINT "Cryptolist_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
