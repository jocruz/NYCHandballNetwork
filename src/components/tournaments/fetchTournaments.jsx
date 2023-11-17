"use client";
import { useEffect, useState } from "react";
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
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  return { tournaments, isLoading, error };
};

export default Tournaments;
