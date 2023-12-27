"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const FetchTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect called - Fetching tournaments"); // Log 1

    const getAllTournaments = async () => {
      try {
        console.log("Fetching data from /api/tournaments"); // Log 2
        const allTournaments = await axios.get("/api/tournaments");
        console.log("Data fetched", allTournaments.data); // Log 3
        setTournaments(allTournaments.data);
      } catch (error) {
        console.error("Error fetching tournaments", error); // Error log
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
