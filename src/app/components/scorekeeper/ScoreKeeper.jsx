"use client";
import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Button,
  Text,
  theme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import axios from "axios";

import { useSearchParams } from "next/navigation";

function ScoreKeeper() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timeoutTeam, setTimeoutTeam] = useState(null);
  const [timeLeft, setTimeLeft] = useState(75);
  const [match, setMatch] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("matchId");

  
  useEffect(() => {
    let timer;
    if (timeoutTeam && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      clearTimeout(timer);
      resetTimeout();
    }

    const getCurrentMatch = async () => {
      try {
        console.log(id);
        const response = await axios.get(`/api/matches/?id=${id}`);
        const data = response.data;
        console.log(data);
        return setMatch(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentMatch();
    return () => clearTimeout(timer);
  }, [timeLeft, timeoutTeam]);

  const incrementScore = async (team) => {
    if (!timeoutTeam) {
      if (team === "A" && scoreA < 21) {
        const newScoreA = scoreA + 1;
        setScoreA(newScoreA);

        try {
          await axios.put("/api/matches/", { id: id, scoresTeamA: newScoreA });
        } catch (err) {
          console.log(err);
        }
      } else if (team === "B" && scoreB < 21) {
        const newScoreB = scoreB + 1;
        setScoreB(newScoreB);
        try {
          axios.put(`/api/matches/`, { id: id, scoresTeamB: newScoreB });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const decrementScore = (team) => {
    if (!timeoutTeam) {
      if (team === "A" && scoreA > 0) {
        setScoreA(scoreA - 1);
      } else if (team === "B" && scoreB > 0) {
        setScoreB(scoreB - 1);
      }
    }
  };

  const startTimeout = (team) => {
    setTimeoutTeam(team);
    setTimeLeft(75);
  };

  const resetTimeout = () => {
    setTimeoutTeam(null);
    setTimeLeft(75);
  };

  return (
    <div>
      <Text>{match?.tournament?.name}</Text>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <HStack justifyContent="space-between">
            {/* Team A */}
            <VStack>
              <Text>
                {match?.playersTeamA?.length > 0
                  ? match.playersTeamA[0].name
                  : "No Player"}
              </Text>

              <Text fontSize="3xl">{scoreA}</Text>
              <Button onClick={() => incrementScore("A")}>Increment</Button>
              <Button onClick={() => decrementScore("A")}>Decrement</Button>
              <Button onClick={() => startTimeout("A")}>Time Out</Button>
            </VStack>
            {/* Team B */}
            <VStack>
              <Text>
                {match?.playersTeamB?.length > 0
                  ? match.playersTeamB[0].name
                  : "No Player"}
              </Text>

              <Text fontSize="3xl">{scoreB}</Text>
              <Button onClick={() => incrementScore("B")}>Increment</Button>
              <Button onClick={() => decrementScore("B")}>Decrement</Button>
              <Button onClick={() => startTimeout("B")}>Time Out</Button>
            </VStack>
          </HStack>
        </Box>
      </VStack>

      {/* Timeout Overlay */}
      {timeoutTeam && (
        <Modal isOpen={!!timeoutTeam} onClose={resetTimeout}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Timeout: Team {timeoutTeam}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="2xl">Time Left: {timeLeft} seconds</Text>
              <Text fontSize="2xl">
                Score Is {scoreA} Server {scoreB}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={resetTimeout}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default ScoreKeeper;
