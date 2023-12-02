/*
  Warnings:

  - You are about to drop the column `userId` on the `players` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('SINGLES', 'DOUBLES');

-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('POINTS_21', 'POINTS_25', 'POINTS_11');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_userId_fkey";

-- DropForeignKey
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_createdById_fkey";

-- DropIndex
DROP INDEX "players_userId_key";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "userId";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "UserRole";
