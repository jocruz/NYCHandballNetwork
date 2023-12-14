/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `tournaments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `tournament_directors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tournaments_clerkUserId_key";

-- AlterTable
ALTER TABLE "tournament_directors" ADD COLUMN     "clerkUserId" TEXT;

-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "clerkUserId";

-- CreateIndex
CREATE UNIQUE INDEX "tournament_directors_clerkUserId_key" ON "tournament_directors"("clerkUserId");
