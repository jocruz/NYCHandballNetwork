"use client";
import TournamentCard from "./TournamentCard";
import { SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";

const TournamentList = ({ tournaments, isLoading }) => {
  if (isLoading) {
    // Render skeletons when loading
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
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default TournamentList;