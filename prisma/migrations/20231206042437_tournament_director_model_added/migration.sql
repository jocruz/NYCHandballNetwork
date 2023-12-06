/*
  Warnings:

  - Added the required column `directorId` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "directorId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "TournamentDirector" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "TournamentDirector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TournamentDirector_email_key" ON "TournamentDirector"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentDirector_phoneNumber_key" ON "TournamentDirector"("phoneNumber");

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "TournamentDirector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
