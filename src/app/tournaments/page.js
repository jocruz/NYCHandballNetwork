// pages/players.js
"use client";
import FetchTournaments from "../components/tournaments/fetchTournaments";
import TournamentList from "../components/tournaments/TournamentList";

const TournamentPage = () => {
  let { tournaments, error, isLoading } = FetchTournaments();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TournamentList tournaments={tournaments} isLoading={isLoading} />
    </div>
  );
};

export default TournamentPage;
