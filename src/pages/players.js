// pages/players.js
"use client";
import React from "react";
import fetchPlayers from "@/components/players/fetchPlayers";
import PlayerList from "../components/players/PlayerList";
import { Providers } from "@/app/providers";

const PlayersPage = () => {
  let { players, isLoading, error } = fetchPlayers();

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Providers>
        <PlayerList players={players} loading = {isLoading} />
      </Providers>
    </div>
  );
};

export default PlayersPage;
