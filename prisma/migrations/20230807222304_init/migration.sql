-- CreateTable
CREATE TABLE "CryptoList" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoList_symbol_key" ON "CryptoList"("symbol");

-- AddForeignKey
ALTER TABLE "CryptoList" ADD CONSTRAINT "CryptoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
