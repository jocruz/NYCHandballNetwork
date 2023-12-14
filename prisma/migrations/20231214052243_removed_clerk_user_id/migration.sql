/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `clerkUserId` on the `tournament_directors` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "players_clerkUserId_key";

-- DropIndex
DROP INDEX "tournament_directors_clerkUserId_key";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "clerkUserId";

-- AlterTable
ALTER TABLE "tournament_directors" DROP COLUMN "clerkUserId";
