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
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

import { useUser } from "@clerk/nextjs";
import RegistrationModal from "../registrationmodal/RegistrationModal";
import ViewParticipants from "../modals/ViewParticipants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleButtonClick = () => {
    console.log(pathname);

    router.push(`${pathname}?tournamentid=${id}`);

    console.log(role);
    if (role === "director") {
      onOpenViewDetails();
    } else {
      isOpenRegistration();
    }
  };

  const search = searchParams.get("tournamentid");
  console.log("This is the searchParam results", search)

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
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handleButtonClick}
          >
            {role === "director" ? "View Details" : "Register"}
          </Button>
          <RegistrationModal
            isOpenRegistration={isOpenRegistration}
            onCloseRegistration={onCloseRegistration}
            tournamentId={id}
            databaseId={userId}
            name={name}
          />
          <ViewParticipants
            isOpenViewDetails={isOpenViewDetails}
            onCloseViewDetails={onCloseViewDetails}
            tournamentId={id}
            databaseId={userId}
            tournamentName={name}
          />
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default TournamentCard;
