/*
  Warnings:

  - You are about to drop the `TournamentDirector` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_directorId_fkey";

-- DropTable
DROP TABLE "TournamentDirector";

-- CreateTable
CREATE TABLE "tournament_directors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "tournament_directors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tournament_directors_email_key" ON "tournament_directors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_directors_phoneNumber_key" ON "tournament_directors"("phoneNumber");

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "tournament_directors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
