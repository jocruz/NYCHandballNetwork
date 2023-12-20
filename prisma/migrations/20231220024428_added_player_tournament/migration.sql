-- CreateTable
CREATE TABLE "_playertournaments" (
    "playerId" UUID NOT NULL,
    "tournamentId" UUID NOT NULL,
    "hasPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "_playertournaments_pkey" PRIMARY KEY ("playerId","tournamentId")
);

-- AddForeignKey
ALTER TABLE "_playertournaments" ADD CONSTRAINT "_playertournaments_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playertournaments" ADD CONSTRAINT "_playertournaments_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
