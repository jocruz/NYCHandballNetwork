/*
  Warnings:

  - Made the column `email` on table `players` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "players" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "categoryRank" DROP NOT NULL,
ALTER COLUMN "overallRank" DROP NOT NULL;
