// pages/players.js
"use client";
import fetchPlayers from "../components/players/fetchPlayers";
import PlayerList from "../components/players/PlayerList";
import ErrorComponent from "../players/error"; // Import the error component

const PlayersPage = () => {
  let { players, isLoading, error } = fetchPlayers(); // Get the error from the hook

  if (error) {
    return <ErrorComponent error={error} />; // Render the error component if there's an error
  }

  return <PlayerList players={players} loading={isLoading} />;
};

export default PlayersPage;
