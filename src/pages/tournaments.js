// pages/players.js
"use client";
import React from "react";
import fetchTournaments from "@/components/tournaments/fetchTournaments";
import TournamentList from "../components/tournaments/TournamentList";
import { Providers } from "@/app/providers";

const TournamentPage = () => {
  let { tournaments,error,isLoading} = fetchTournaments();

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Providers>
        <TournamentList tournaments={tournaments} isLoading= {isLoading} />
      </Providers>
    </div>
  );
};

export default TournamentPage;
