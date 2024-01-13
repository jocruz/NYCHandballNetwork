import React, { useState, useEffect } from "react";
import { Select, Box, Flex, Text, Button } from "@chakra-ui/react";
import FetchTournaments from "./FetchTournaments";
import axios from "axios";
import { useRouter } from "next/navigation";
import Matches from "../matches/matches";

const AssignMatches = ({ user }) => {
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isPlayersAssigned, setIsPlayersAssigned] = useState(false);
  const router = useRouter();

  let { tournaments, isLoading } = FetchTournaments(); // Your custom hook to fetch tournaments

  const userDatabaseId = user.publicMetadata.databaseId;
  const directorTournaments = tournaments.filter(
    (tournament) => tournament.directorId === userDatabaseId
  );

  // uses Id to create x even number of matches...

  const handleTournamentChange = async (e) => {
    const id = e.target.value;
    setSelectedTournamentId(id);

    // Use the new tournament ID directly in the router.push call
    // omitting the pathname and using router.push() with just query parameters is a way to succinctly modify the query part of the URL while assuming the rest of the URL (especially the pathname) stays the same.
    router.push(`?id=${id}`);

    try {
      const response = await axios.get(`/api/tournaments?id=${id}`);
      const data = response.data.playerRegistrations;
      const numberOfPlayers = data.length;
      console.log(response.data.playerRegistrations[0].player);

      //assign participants:
      setParticipants(data.map((player) => player.player));

      const numberOfMatches = Math.ceil(numberOfPlayers / 2);

      setMatches(new Array(numberOfMatches).fill(0));
    } catch (err) {
      console.log(err);
    }
  };

  // this updates the selectedPlayers state with an object { "teamA": "3a1d995e-9e0b-42d1-a2d7-a9e46f45f791", "teamB": ... }
  const handlePlayerSelection = (matchIndex, team, playerId) => {
    let updatedSelections = [...selectedPlayers];
    if (!updatedSelections[matchIndex]) {
      //assign the team to null
      updatedSelections[matchIndex] = { teamA: null, teamB: null };
    }

    updatedSelections[matchIndex][team] = playerId;

    setSelectedPlayers(updatedSelections);
  };

  const assignPlayersToMatch = async (matchIndex) => {
    const matchData = selectedPlayers[matchIndex];
    console.log("Sending match data:", matchData);
    if (matchData && matchData.teamA && matchData.teamB) {
      try {
        await axios.post("/api/matches", {
          matchType: "Singles",
          tournamentId: selectedTournamentId,
          playersTeamA: [matchData.teamA],
          playersTeamB: [matchData.teamB],
        });
        // Handle successful response, maybe update UI or show confirmation
        setIsPlayersAssigned(true);
      } catch (error) {
        console.error("Error creating match:", error.response.data);
        // Handle error
      }
    }
  };

  console.log(selectedPlayers);
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
        <Select
          placeholder="Player for Team A"
          onChange={(e) =>
            handlePlayerSelection(index, "teamA", e.target.value)
          }
        >
          {/* Options for players */}
          {participants.map((participant, index) => (
            <option key={index} value={participant.id}>
              {participant.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Player for Team B"
          onChange={(e) =>
            handlePlayerSelection(index, "teamB", e.target.value)
          }
        >
          {/* Options for players */}
          {participants.map((participant, index) => (
            <option key={index} value={participant.id}>
              {participant.name}
            </option>
          ))}
        </Select>
        {!isPlayersAssigned ? (
          <Button onClick={() => assignPlayersToMatch(index)}>
            Assign Players
          </Button>
        ) : (
          <Button onClick={() => navigateToScoreKeeper(match.id)}>
            Ref this Game
          </Button>
        )}
      </Box>
    ));
  };

  useEffect(() => {
    console.log("MatchesManager.jsx component has been mounted");
  }, [selectedTournamentId]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  console.log(selectedPlayers);
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

export default AssignMatches;
