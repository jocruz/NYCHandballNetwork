"use client";
import TournamentCard from "./TournamentCard";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";

import FetchTournaments from "@/app/components/tournaments/FetchTournaments";
import { useEffect } from "react";

const DirectorTournaments = ({ user }) => {
  let { tournaments, error, isLoading } = FetchTournaments();
  // const { user } = useUser();
  const userDatabaseId = user.publicMetadata.databaseId;
  const directorTournaments = tournaments.filter(
    (tournament) => tournament.directorId === userDatabaseId
  );

  useEffect(() => {
    console.log("DirectorTournaments Mounted");

    return () => {
      console.log("DirectorTournaments Unmounting");
    };
  }, []);
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
          <TournamentCard key={tournament.id} user={user} {...tournament} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default DirectorTournaments;
