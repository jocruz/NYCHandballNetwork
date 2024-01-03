import React, { useState, useEffect } from "react";
import {
  Select,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import FetchTournaments from "./FetchTournaments";
import axios from "axios";
import { useRouter } from "next/navigation";


const MatchesManager = ({ user }) => {
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [matches, setMatches] = useState([]);
  const router = useRouter();

  let { tournaments, isLoading } = FetchTournaments(); // Your custom hook to fetch tournaments

  const userDatabaseId = user.publicMetadata.databaseId;
  const directorTournaments = tournaments.filter(
    (tournament) => tournament.directorId === userDatabaseId
  );

  const handleTournamentChange = async (e) => {
    const id = e.target.value;
    setSelectedTournamentId(id);

    // Use the new tournament ID directly in the router.push call
    // omitting the pathname and using router.push() with just query parameters is a way to succinctly modify the query part of the URL while assuming the rest of the URL (especially the pathname) stays the same.
    router.push(`?id=${id}`);

    try {
      const response = await axios.get(`/api/tournaments?id=${id}`);
      const data = response.data.playerRegistrations;
      console.log(response.data);
      const numberOfPlayers = data.length;
      console.log(numberOfPlayers);

      const numberOfMatches = Math.ceil(numberOfPlayers / 2);

      setMatches(new Array(numberOfMatches).fill(0));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to render match cards
  const renderMatchCards = () => {
    return matches.map((match, index) => (
      <Box
        key={index}
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        m={2}
      >
        <Text mb={2}>Match {index + 1}</Text>
        {/* Here you would have your logic to assign players or BYE */}
        <Button colorScheme="blue">Assign Players</Button>
      </Box>
    ));
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
      <Flex wrap="wrap" justify="center">
        {renderMatchCards()}
      </Flex>
    </div>
  );
};

export default MatchesManager;
