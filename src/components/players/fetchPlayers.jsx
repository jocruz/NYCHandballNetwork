"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/api/players");
        setPlayers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);


  return { players, isLoading, error };
};

export default fetchPlayers;
