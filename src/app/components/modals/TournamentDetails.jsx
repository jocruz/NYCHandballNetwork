"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  ButtonGroup,
  Spacer,
  useToast,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const TournamentDetails = ({
  isOpenEditModal,
  onCloseEditModal,
  tournamentId,
  initialTournamentData,
}) => {
  const [name, setName] = useState(initialTournamentData.name || "");
  const [date, setDate] = useState(initialTournamentData.date || "");
  const [price, setPrice] = useState(initialTournamentData.price || "");
  const [location, setLocation] = useState(
    initialTournamentData.location || ""
  );

  const toast = useToast();

  const id = tournamentId;

  const isoDate = new Date(date).toISOString();
  console.log(initialTournamentData.date);

  const tournamentData = {
    id,
    name,
    location,
    date: isoDate,
    price: +price, // unary plus operator (+) in JavaScript is a simple and quick way to convert values to numbers.
  };

  const handleFormSubmit = async () => {
    try {
      axios.put("/api/tournaments/", tournamentData);
      toast({
        title: "Update Successful.",
        description: "You've successfully updated your tournament!.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpenEditModal}>
      <Flex justifyContent="center" alignItems="center">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tournament Management</ModalHeader>
          <ModalBody>
            <Text>
              You can edit your tournament details here, the changes should
              reflect after you hit submit.
            </Text>
            <Spacer h={10} />

            <FormControl onSubmit={handleFormSubmit}>
              <FormLabel>Name of Tournament</FormLabel>
              <Input
                type="text"
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText>
                Change the title of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Date of Tournament</FormLabel>
              <Input
                id="date-of-tournament"
                type="date"
                placeholder={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <FormHelperText>
                Change the date of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Price of Tournament</FormLabel>
              <Input
                type="number"
                placeholder={initialTournamentData.price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormHelperText>
                Change the price of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Location of Tournament</FormLabel>
              <Input
                type="text"
                placeholder={initialTournamentData.location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <FormHelperText>
                Change the Location of your tournament{" "}
              </FormHelperText>
            </FormControl>

            <Spacer h={12} />
            <Flex>
              <ButtonGroup gap="5">
                <Button
                  colorScheme="facebook"
                  rounded={"lg"}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "lg",
                  }}
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onCloseEditModal}
              rounded={"lg"}
              _hover={{
                transform: "translateY(-10px)",
                boxShadow: "lg",
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Flex>
    </Modal>
  );
};

export default TournamentDetails;
