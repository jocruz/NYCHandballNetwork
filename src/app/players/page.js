// pages/players.js
"use client";
import fetchPlayers from "../components/players/fetchPlayers";
import PlayerList from "../components/players/PlayerList";

const PlayersPage = () => {
  let { players, isLoading, error } = fetchPlayers();

  if (error) return <p>Error: {error.message}</p>;

  return <PlayerList players={players} loading={isLoading} />;
};

export default PlayersPage;
