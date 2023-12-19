"use client";
import TournamentCard from "./TournamentCard";
import TournamentList from "./TournamentList";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";

import { useUser } from "@clerk/nextjs";

import FetchTournaments from "@/app/components/tournaments/FetchTournaments";

const DirectorTournaments = () => {
  let { tournaments, error, isLoading } = FetchTournaments();
  const { user } = useUser();
  const userDatabaseId = user.publicMetadata.databaseId;
  const directorTournaments = tournaments.filter(
    (tournament) => tournament.directorId === userDatabaseId
  );

  if (isLoading) {
    //  Render skeletons when loading
    //  Skeleton is used to display the loading state of some component.
    return (
      <SimpleGrid columns={3} spacing={4}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} height="350px" />
        ))}
      </SimpleGrid>
    );
  }
  return (
    <div>
      <SimpleGrid columns={3} spacing={4}>
        {directorTournaments.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default DirectorTournaments;
