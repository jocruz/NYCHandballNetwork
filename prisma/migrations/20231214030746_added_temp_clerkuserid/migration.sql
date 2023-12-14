/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `players` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkUserId]` on the table `tournaments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "clerkUserId" TEXT;

-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "clerkUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "players_clerkUserId_key" ON "players"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "tournaments_clerkUserId_key" ON "tournaments"("clerkUserId");
