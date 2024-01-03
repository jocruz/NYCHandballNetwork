import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react"; // assuming you're using Chakra UI for dropdown
import FetchTournaments from "./FetchTournaments";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MatchesManager = ({ user }) => {
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let { tournaments, isLoading } = FetchTournaments(); // Your custom hook to fetch tournaments

  const userDatabaseId = user.publicMetadata.databaseId;
  const directorTournaments = tournaments.filter(
    (tournament) => tournament.directorId === userDatabaseId
  );

  const handleTournamentChange = async (e) => {
    const id = e.target.value;
    setSelectedTournamentId(id);

    // Use the new tournament ID directly in the router.push call
    router.push(`?id=${id}`);
    // ... Other component

    try {
      const response = await axios.get(`/api/tournaments?id=${id}`);
      const data = response.data.playerRegistrations;
      console.log(response.data);
      const numberOfPlayers = data.length;
      console.log(numberOfPlayers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("MatchesManager.jsx component has been mounted");
  }, [selectedTournamentId]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div>
      <Select placeholder="Select tournament" onChange={handleTournamentChange}>
        {directorTournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </Select>
      {/* Rest of your Bracket Management UI */}
    </div>
  );
};

export default MatchesManager;
