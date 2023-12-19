import React from "react";
import RegistrationModal from "@/app/components/registrationmodal/RegistrationModal";
import FetchTournaments from "@/app/components/tournaments/FetchTournaments";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import TournamentCard from "./TournamentCard";

const PlayerTournaments = () => {
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
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default PlayerTournaments;
