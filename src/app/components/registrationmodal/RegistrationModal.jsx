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
} from "@chakra-ui/react";
import axios from "axios";

import { MdOutlineAddLocationAlt, MdAddReaction } from "react-icons/md";
//this modal should have tournament details, should have buttons that users can use to register

const RegistrationModal = ({
  isOpenRegistration,
  onCloseRegistration,
  name,
  tournamentId,
  databaseId,
}) => {
  const toast = useToast();


  const handleOnSubmit = async (hasPaid) => {
    try {
      console.log(tournamentId, databaseId,hasPaid);
      await axios.post("/api/players/", { tournamentId, databaseId, hasPaid });

      toast({
        title: `You have signed up for ${name}`,
        description: "You will pay on site. Director will be notified.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("Could not register", err);
      toast({
        title: `Sign up failed ${name}`,
        description: `The Sign up failed, please try again, ${err}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpenRegistration}>
      <Flex justifyContent="center" alignItems="center">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tournament Registration For {name}</ModalHeader>
          <ModalBody>
            <Text>
              Depending on your choice, the tournament director will know
              whether you've already paid or plan to pay on the day of the
              tournament. Please make your selection accordingly. If you need to
              change your payment method later, please contact the tournament
              director.
            </Text>
            <Spacer h={12} />
            <Flex>
              <ButtonGroup gap="5">
                <Button
                  leftIcon={<MdOutlineAddLocationAlt />}
                  colorScheme="facebook"
                  rounded={"lg"}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => handleOnSubmit(false)}
                >
                  Pay On Site
                </Button>
                <Button
                  leftIcon={<MdAddReaction />}
                  colorScheme="facebook"
                  rounded={"lg"}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => handleOnSubmit(true)}
                >
                  Already Paid, Sign Me Up!
                </Button>
              </ButtonGroup>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onCloseRegistration}
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

export default RegistrationModal;
