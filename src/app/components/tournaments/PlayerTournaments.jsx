import React from "react";
import FetchTournaments from "@/app/components/tournaments/FetchTournaments";
import { SimpleGrid } from "@chakra-ui/react";
import TournamentCard from "./TournamentCard";

const PlayerTournaments = ({user}) => {
  let { tournaments, error, isLoading } = FetchTournaments();

  const activeTournaments = tournaments.filter(
    (tournament) => tournament.active === true
  );

  if (error) {
    return <div>There was an error getting the active tournaments</div>;
  }
  return (
    <div>
      <SimpleGrid columns={3} spacing={4}>
        {activeTournaments.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} user={user} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default PlayerTournaments;
