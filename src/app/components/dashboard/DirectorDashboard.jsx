// pages/players.js
"use client";
import FetchTournaments from "../tournaments/FetchTournaments";
import TournamentList from "../tournaments/TournamentList";


const DirectorDashboard = () => {
  let { tournaments, error, isLoading } = FetchTournaments();

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      Welcome to the DirectorDashboard
      <div>
        <TournamentList tournaments={tournaments} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DirectorDashboard;
