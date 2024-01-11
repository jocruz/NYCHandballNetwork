"use client";
import { useEffect, useState } from "react";
import { Select, Box, Flex, Text, Button } from "@chakra-ui/react";
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

  const fetchMatchDetails = async (matchId) => {
    try {
      const response = await axios.get(`/api/matches?${matchId}`);
      // Process the response, which includes the match and associated players
      // ...
    } catch (error) {
      console.error('Error fetching match details:', error);
      // Handle error appropriately
    }
  };

  
  
  return (
    
    <section>
      {matches.map((match) => (
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
            <Button>
              Ref this game!
            </Button>
          </Box>
        </div>
      ))}
    </section>
  );
};

export default Matches;
