"use client";
import { useEffect, useState } from "react";
import { Select, Box, Text, Button, useToast } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directorTournaments, setDirectorTournaments] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const allMatches = await axios.get("/api/matches");
        setMatches(allMatches.data);
        setLoading(false);

        // Extract unique tournaments using an object
        const tournamentsObj = {};
        allMatches.data.forEach((match) => {
          // if the tournamentsobj object does not have the key value of the tournament.id then
          // we are going to add in the key value with the match.tournament.id and assign the value to that key with the object
          if (!tournamentsObj[match.tournament.id]) {
            tournamentsObj[match.tournament.id] = match.tournament;
          }
        });
        // we then set in our state array only the values of the object
        setDirectorTournaments(Object.values(tournamentsObj));
      } catch (error) {
        setError(error);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(directorTournaments);
  console.log(window.location.origin);

  const handleTournamentChange = (e) => {
    const id = e.target.value;
    setSelectedTournament(id);
  };

  const handleRefGame = (matchId) => {
    router.push(`/score-keeper?matchId=${matchId}`);
  };

  const copyRefMatchUrl = (matchId) => {
    const matchUrl = `${window.location.origin}/score-keeper?matchId=${matchId}`;
    navigator.clipboard.writeText(matchUrl);

    if (navigator.clipboard) {
      toast({
        title: "Update Successful.",
        description: "You've successfully copied the URL.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredMatches = selectedTournament
    ? matches.filter((match) => match.tournament.id === selectedTournament)
    : [];

  console.log(filteredMatches);
  return (
    <section>
      <Select placeholder="Select tournament" onChange={handleTournamentChange}>
        {directorTournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </Select>

      {filteredMatches.map((match) => {
        return (
          <Box
            key={match.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            m={2}
          >
            <Text>
              {" "}
              {match?.playersTeamA?.length > 0
                ? match.playersTeamA[0].name
                : "No Player"}
              VS
              {match?.playersTeamB?.length > 0
                ? match.playersTeamB[0].name
                : "No Player"}
              {match.status}
            </Text>
            <Button onClick={() => handleRefGame(match.id)}>
              Ref this game!
            </Button>
            <Button onClick={() => copyRefMatchUrl(match.id)}>Copy URL</Button>
          </Box>
        );
      })}
    </section>
  );
};

export default Matches;
