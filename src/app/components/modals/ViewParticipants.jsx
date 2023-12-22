"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  Flex,
  useToast,
  Box,
  Button,
} from "@chakra-ui/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ViewParticipants = ({ isOpenViewDetails, onCloseViewDetails }) => {
  const toast = useToast();

  // Mock data for players
  const players = [
    { name: "Player 1", hasPaid: false },
    { name: "Player 2", hasPaid: true },
    //...other players
  ];

  console.log("viewparticiapnts.jsx");
  return (
    <Modal isOpen={isOpenViewDetails}>
      <ModalOverlay />
      <ModalContent>
        <Flex direction={{ base: "column", md: "row" }} p={5}>
          {/* Players List */}
          <Box flex="1" mr={5}>
            <Text fontSize="xl" mb="4">
              Players
            </Text>
            {players.map((player, index) => (
              <Box key={index} p={3} boxShadow="md" mb={3}>
                {player.name}
              </Box>
            ))}
          </Box>

          {/* Action and Status Section */}
          <Box flex="1">
            <Text fontSize="xl" mb="4">
              Actions & Status
            </Text>
            {players.map((player, index) => (
              <Flex key={index} align="center" mb={3}>
                <Text flex="1" p={3} boxShadow="md">
                  {player.hasPaid ? "Has Paid" : "Plans to Pay On Site"}
                </Text>
              </Flex>
            ))}
          </Box>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onCloseViewDetails}
            rounded={"lg"}
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "lg",
            }}
          >
            Close
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ViewParticipants;
