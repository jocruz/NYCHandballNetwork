-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "categoryRank" TEXT NOT NULL,
    "overallRank" INTEGER NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "totalPlayers" INTEGER,
    "location" TEXT NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "matchType" TEXT NOT NULL,
    "gameType" INTEGER NOT NULL,
    "scoresTeamA" INTEGER NOT NULL,
    "scoresTeamB" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeouts" (
    "timeoutId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "timeoutType" TEXT NOT NULL,
    "timeoutDuration" TEXT NOT NULL,
    "timeoutTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeouts_pkey" PRIMARY KEY ("timeoutId")
);

-- CreateTable
CREATE TABLE "wipes" (
    "wipeId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "wipeTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wipes_pkey" PRIMARY KEY ("wipeId")
);

-- CreateTable
CREATE TABLE "_PlayerTournaments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayersTeamA" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayersTeamB" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTournaments_AB_unique" ON "_PlayerTournaments"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTournaments_B_index" ON "_PlayerTournaments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayersTeamA_AB_unique" ON "_PlayersTeamA"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayersTeamA_B_index" ON "_PlayersTeamA"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayersTeamB_AB_unique" ON "_PlayersTeamB"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayersTeamB_B_index" ON "_PlayersTeamB"("B");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeouts" ADD CONSTRAINT "timeouts_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeouts" ADD CONSTRAINT "timeouts_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wipes" ADD CONSTRAINT "wipes_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wipes" ADD CONSTRAINT "wipes_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournaments" ADD CONSTRAINT "_PlayerTournaments_A_fkey" FOREIGN KEY ("A") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournaments" ADD CONSTRAINT "_PlayerTournaments_B_fkey" FOREIGN KEY ("B") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersTeamA" ADD CONSTRAINT "_PlayersTeamA_A_fkey" FOREIGN KEY ("A") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersTeamA" ADD CONSTRAINT "_PlayersTeamA_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersTeamB" ADD CONSTRAINT "_PlayersTeamB_A_fkey" FOREIGN KEY ("A") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayersTeamB" ADD CONSTRAINT "_PlayersTeamB_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
