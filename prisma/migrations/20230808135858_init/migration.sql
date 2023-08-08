/*
  Warnings:

  - A unique constraint covering the columns `[symbol,userId]` on the table `CryptoList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CryptoList_symbol_key";

-- CreateIndex
CREATE UNIQUE INDEX "CryptoList_symbol_userId_key" ON "CryptoList"("symbol", "userId");
