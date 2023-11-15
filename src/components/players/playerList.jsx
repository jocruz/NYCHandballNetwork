// components/players/PlayerList.jsx
"use client";
import React from "react";
import PlayerCard from "./PlayerCard";

const PlayerList = ({ players, loading }) => {
    console.log("hi");
  if (loading) {
    return <div>Loading players...</div>;
  }
  return (
    <div>
      {players.map((player) => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </div>
  );
};

export default PlayerList;
