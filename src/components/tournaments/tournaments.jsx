"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const allTournaments = await axios.get("/api/tournaments");
        setTournaments(allTournaments.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchTournaments();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {tournaments.map((tournament) => (
        <div key={tournament.id}>
          <h3>{tournament.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Tournaments;
