"use client";
import {
  Heading,
  Card,
  CardHeader,
  Text,
  Flex,
  Button,
  CardFooter,
  CardBody,
  Divider,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

import { useUser } from "@clerk/nextjs";
import RegistrationModal from "../registrationmodal/RegistrationModal";

const TournamentCard = ({ name, type, location, date, id }) => {
  const { user } = useUser();
  const betterDate = new Date(date);

  // Format for display
  const readableDate = betterDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const role = user.publicMetadata.role;
  const userId = user.publicMetadata.databaseId;
  console.log(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="row" wrap="wrap" justify="center" align="center">
      <Card align="center" size="md">
        <CardHeader>
          <Heading size="md"> {name}</Heading>
          <Divider />
        </CardHeader>

        <FaLocationDot size={"50"} />

        <Text as={"b"} size="md" color="blue.700">
          {location}
        </Text>

        <CardBody>
          <Text fontSize="5xl" color="blue.700">
            {readableDate}
          </Text>
          <Text fontSize="5xl" color="blue.700">
            {type} Game Point Matches
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="teal" variant="solid" onClick={onOpen}>
            {role === "director" ? "View Details" : "Register"}
          </Button>
          <RegistrationModal
            isOpen={isOpen}
            onClose={onClose}
            tournamentId={id}
            databaseId={userId}
          />
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default TournamentCard;
