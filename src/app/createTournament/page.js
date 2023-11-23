// pages/players.js
"use client";
import React from "react";
import { Providers } from "@/app/providers";
import TournamentCreationForm from "@/components/tournaments/TournamentCreationForm";

const TournamentPage = () => {

  return (
    <div>
      <Providers>
        <TournamentCreationForm/>
      </Providers>
    </div>
  );
};

export default TournamentPage;
