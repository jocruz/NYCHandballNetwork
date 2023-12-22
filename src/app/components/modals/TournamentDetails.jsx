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

const TournamentDetails = ({
  isOpen,
  onClose,
  name,
  tournamentId,
  databaseId,
}) => {
  const toast = useToast();

  const handleOnSubmit = async () => {
    try {
      console.log(tournamentId);
      await axios.put("/api/tournament/", { tournamentId });

      toast({
        title: `Update Complete  ${name}`,
        description: "Tournament has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("Could not update tournament", err);
      toast({
        title: `Update  failed`,
        description: `Changing the tournament details failed${err}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true}>
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
            <FormControl>
              <FormLabel>Name of Tournament</FormLabel>
              <Input type="text" />
              <FormHelperText>
                Change the title of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Date of Tournament</FormLabel>
              <Input type="date" />
              <FormHelperText>
                Change the date of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Price of Tournament</FormLabel>
              <Input type="number" />
              <FormHelperText>
                Change the price of your tournament{" "}
              </FormHelperText>
              <Spacer h={8} />
              <FormLabel>Change Location of Tournament</FormLabel>
              <Input type="text" />
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
                >
                  Submit
                </Button>
                <Button
                  colorScheme="facebook"
                  rounded={"lg"}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "lg",
                  }}
                >
                  Back
                </Button>
              </ButtonGroup>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
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
