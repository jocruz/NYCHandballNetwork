// pages/players.js
"use client";

import FetchTournaments from "../tournaments/FetchTournaments";
import TournamentList from "../tournaments/TournamentList";
import SidebarWithHeader from "../sidebar/sidebar";

const DirectorDashboard = () => {
  let { tournaments, error, isLoading } = FetchTournaments();

  if (error) return <p>Error: {error.message}</p>;
  return <SidebarWithHeader />;
};

export default DirectorDashboard;
