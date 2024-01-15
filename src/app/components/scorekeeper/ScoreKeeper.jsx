"use client";
import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Center,
  typography,
} from "@chakra-ui/react";

import axios from "axios";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

import { useSearchParams } from "next/navigation";

function ScoreKeeper() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timeoutTeam, setTimeoutTeam] = useState(null);
  const [timeLeft, setTimeLeft] = useState(75);
  const [match, setMatch] = useState({});
  const [timeoutCounterA, setTimeoutCounterA] = useState(0);
  const [timeoutCounterB, setTimeoutCounterB] = useState(0);
  const [timeOutPlayer, setTimeOutPlayer] = useState("none");
  const searchParams = useSearchParams();
  const id = searchParams.get("matchId");
  const [playerAName, setPlayerAName] = useState("");
  const [playerBName, setPlayerBName] = useState("");



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
        const response = await axios.get(`/api/matches/?id=${id}`);
        const data = response.data;
        setMatch(data);
        setScoreA(data.scoresTeamA);
        setScoreB(data.scoresTeamB);
      } catch (err) {
        setPlayerAName("Player A")
        setPlayerBName("Player B")
        console.log(err);
      }
    };
    getCurrentMatch();

    return () => clearTimeout(timer);
  }, [timeLeft, timeoutTeam]);

  function updateMatchStatus(newScoreA, newScoreB) {
    let status;
    if (newScoreA === 21 || newScoreB === 21) {
      status = "COMPLETED";
    } else if (newScoreA > 0 || newScoreB > 0) {
      status = "IN PROGRESS";
    } else {
      status = "PENDING";
    }
    if (id && status) {
      axios.put("/api/matches", { id: id, status: status });
    }
  }

  const incrementScore = async (team) => {
    if (!timeoutTeam) {
      if (team === "A" && scoreA < 21) {
        const newScoreA = scoreA + 1;
        setScoreA(newScoreA);
        try {
          if (id && newScoreA) {
            axios.put("/api/matches", { id: id, scoresTeamA: newScoreA });
          }
        } catch (err) {
          console.log(err);
        }
        updateMatchStatus(newScoreA, scoreB);
      } else if (team === "B" && scoreB < 21) {
        const newScoreB = scoreB + 1;
        setScoreB(newScoreB);
        if (id && newScoreB) {
          try {
            axios.put("/api/matches", { id: id, scoresTeamB: newScoreB });
          } catch (err) {
            console.log(err);
          }
        }

        updateMatchStatus(scoreA, newScoreB);
      }
    }
  };

  const decrementScore = (team) => {
    if (!timeoutTeam) {
      if (team === "A" && scoreA > 0) {
        const newScoreA = scoreA - 1;
        setScoreA(newScoreA);
        if (id && newScoreA) {
          try {
            axios.put("/api/matches", { id: id, scoresTeamA: newScoreA });
          } catch (err) {
            console.log(err);
          }
        }

        updateMatchStatus(newScoreA, scoreB);
      } else if (team === "B" && scoreB > 0) {
        const newScoreB = scoreB - 1;
        setScoreB(newScoreB);
        if (id && newScoreB) {
          try {
            axios.put("/api/matches", { id: id, scoresTeamB: newScoreB });
          } catch (err) {
            console.log(err);
          }
        }

        updateMatchStatus(scoreA, newScoreB);
      }
    }
  };

  const startTimeout = (team, name) => {
    setTimeoutTeam(team);
    setTimeOutPlayer(name);
    if (team === "A") {
      setTimeoutCounterA((prev) => prev + 1);
    } else setTimeoutCounterB((prev) => prev + 1);

    setTimeLeft(75);
  };

  const resetTimeout = () => {
    setTimeoutTeam(null);
    setTimeLeft(75);
  };

  console.log("hello", timeoutCounterA);

  console.log("the score for Score B is:", scoreB);
  return (
    <div>
      <Center>
        <Text
          position={"center"}
          fontSize="2xl"
          fontWeight="600"
          color="teal.500"
          my={8}
        >
          {match?.tournament?.name}
        </Text>
      </Center>

      <VStack spacing={4} align="stretch">
        <Box
          p={{ base: 3, md: 5 }}
          pb={{ base: 8, md: 5 }}
          shadow="md"
          borderWidth="1px"
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            spacing={{ base: 4, md: 0 }}
          >
            {/* Team A */}
            <VStack mb={{ base: "100", md: "0" }}>
              {/* Team A Names */}
              <Text fontSize="2xl" fontWeight="600">
                {match?.playersTeamA?.length > 0
                  ? match.playersTeamA[0].name
                  : "No Player"}
              </Text>

              {/* Team A Score */}
              <Text fontSize="3xl" fontWeight="500">
                {scoreA}
              </Text>
              {/* Team A Increment Button */}
              <Stack direction="row" spacing={20}>
                <Button
                  colorScheme="blue"
                  leftIcon={<FaPlusSquare />}
                  onClick={() => incrementScore("A")}
                >
                  Point to the Server
                </Button>
                <Button
                  colorScheme="red"
                  leftIcon={<FaMinusSquare />}
                  onClick={() => decrementScore("A")}
                >
                  Penalty
                </Button>
              </Stack>

              {/* Team A Time Out Button*/}
              <Text>Time Outs Left: {3 - timeoutCounterA}</Text>
              {timeoutCounterA !== 3 ? (
                <Button
                  onClick={() => startTimeout("A", (match.playersTeamA[0].name))}
                >
                  Time Out
                </Button>
              ) : (
                <button> No more Time outs left</button>
              )}
            </VStack>

            {/* Team B */}

            <VStack mb={{ base: "10", md: "0" }}>
              {/* Team B Name */}
              <Text fontSize="2xl" fontWeight="600">
                {match?.playersTeamB?.length > 0
                  ? match.playersTeamB[0].name
                  : "No Player"}
              </Text>

              {/* Team B Score */}
              <Text fontSize="3xl" fontWeight="500">
                {scoreB}
              </Text>

              {/* Team B Increment*/}
              <Stack direction="row" spacing={20}>
                <Button
                  colorScheme="blue"
                  leftIcon={<FaPlusSquare />}
                  onClick={() => incrementScore("B")}
                >
                  Point to the Server
                </Button>

                {/* Team B Decrement*/}
                <Button
                  colorScheme="red"
                  leftIcon={<FaMinusSquare />}
                  onClick={() => decrementScore("B")}
                >
                  Penalty
                </Button>
              </Stack>
              {/* Team B TimeOut Button*/}
              <Text>Time Outs Left: {3 - timeoutCounterB}</Text>
              {timeoutCounterB !== 3 ? (
                <Button
                  onClick={() => startTimeout("B", match.playersTeamB[0].name)}
                >
                  Time Out
                </Button>
              ) : (
                <button> No more Time outs left</button>
              )}
            </VStack>
          </Stack>
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
              <Text fontSize="2xl">TimeOut Called By: {timeOutPlayer}</Text>
              {timeoutTeam === "A" ? (
                <Text>
                  Remaining Time Out Calls left: {3 - timeoutCounterA}
                </Text>
              ) : (
                <Text>
                  Remaining Time Out Calls left: {3 - timeoutCounterB}
                </Text>
              )}

              <Text fontSize="2xl">
                Score Is {scoreA} Servering {scoreB}
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
