"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const FetchTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllTournaments = async () => {
      try {
        const allTournaments = await axios.get("/api/tournaments");
        setTournaments(allTournaments.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAllTournaments();
  }, []);

  return { tournaments, isLoading, error };
};

export default FetchTournaments;
