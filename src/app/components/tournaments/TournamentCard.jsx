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
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

import { useUser } from "@clerk/nextjs";
import RegistrationModal from "../registrationmodal/RegistrationModal";
import ViewParticipants from "../modals/ViewParticipants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TournamentDetails from "../modals/TournamentDetails";

const TournamentCard = ({
  name,
  type,
  location,
  date,
  id,
  active,
  price,
  totalPlayers,
}) => {
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

  const initialTournamentData = {name,type,location,date,id,active,price,totalPlayers};
  const {
    isOpen: isOpenRegistration,
    onOpen: onOpenRegistration,
    onClose: onCloseRegistration,
  } = useDisclosure();
  const {
    isOpen: isOpenViewDetails,
    onOpen: onOpenViewDetails,
    onClose: onCloseViewDetails,
  } = useDisclosure();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // different functions different buttons

  // const openParticipantModal

  // const  openEditModal

  const openParticipantModal = () => {
    console.log("button was clicked in TournamentCard.jsx for modal to open");

    router.push(`${pathname}?tournamentid=${id}`);

    onOpenViewDetails();
  };

  const openEditModal = () => {
    console.log("This is the openEditModal function being pressed");

    router.push(`${pathname}?tournamentid=${id}`);

    onOpenEditModal();
  };

  const search = searchParams.get("tournamentid");
  console.log("This is the searchParam results", search);

  console.log(search);
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
          <Text fontSize="3xl" color="blue.900">
            Status: Currently {active ? "Accepting Players" : "non-active"}
          </Text>
          <Text fontSize="2xl" color="blue.900">
            Entry Fee: ${price} , Only {totalPlayers} players total entry
          </Text>
        </CardBody>

        <CardFooter>
          <ButtonGroup>
            {role === "director" && (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={openParticipantModal}
              >
                View Participants
                {/* {role === "director" ? "View Participants" : "Register"} */}
              </Button>
            )}

            {role === "director" && (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={openEditModal}
              >
                Edit Tournament Details
                {/* {role === "director" ? "View Participants" : "Register"} */}
              </Button>
            )}

            {role === "player" && (
              <Button colorScheme="teal" variant="solid">
                Register
                {/* {role === "director" ? "View Participants" : "Register"} */}
              </Button>
            )}
            {role === "player" && (
              <Button colorScheme="teal" variant="solid">
                View Details
                {/* {role === "director" ? "View Participants" : "Register"} */}
              </Button>
            )}
          </ButtonGroup>

          {isOpenRegistration && (
            <RegistrationModal
              isOpenRegistration={isOpenRegistration}
              onCloseRegistration={onCloseRegistration}
              tournamentId={id}
              databaseId={userId}
              name={name}
            />
          )}
          {isOpenViewDetails && (
            <ViewParticipants
              isOpenViewDetails={isOpenViewDetails}
              onCloseViewDetails={onCloseViewDetails}
              tournamentId={id}
              databaseId={userId}
              tournamentName={name}
            />
          )}

          {isOpenEditModal && (
            <TournamentDetails
              isOpenEditModal={isOpenEditModal}
              onCloseEditModal={onCloseEditModal}
              tournamentId={id}
              initialTournamentData = {initialTournamentData}
            />
          )}
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default TournamentCard;
