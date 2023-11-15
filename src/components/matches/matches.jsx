"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const allMatches = await axios.get("/api/matches");
        setMatches(allMatches.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchMatches();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      {matches.map((match) => (
        <div key={match.id}>
          <h3>{match.gameType}</h3>
        </div>
      ))}
    </section>
  );
};

export default Matches;
