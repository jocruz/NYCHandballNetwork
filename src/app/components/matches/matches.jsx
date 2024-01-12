"use client";
import { useEffect, useState } from "react";
import { Select, Box, Flex, Text, Button } from "@chakra-ui/react";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directorTournaments, setDirectorTournaments] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);

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

  const handleTournamentChange = (e) => {
    const id = e.target.value;
    setSelectedTournament(id);
  };

  const tm = matches.map((match) => {
    if (match.tournament.id === selectedTournament) {
      return (
        <div key={match.id}>
          <Box
            key={match.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            m={2}
          >
            <Text>{match.id}</Text>
            <Button>Ref this game!</Button>
          </Box>
        </div>
      );
    }
  });

  const filteredMatches = selectedTournament
    ? matches.filter((match) => match.tournament.id === selectedTournament)
    : [];

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
            <Text>{match.id}</Text>
            <Button>Ref this game!</Button>
          </Box>
        );
      })}
    </section>
  );
};

export default Matches;
