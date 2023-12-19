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

const RegistrationModal = ({ isOpen, onClose,name, tournamentId, databaseId  }) => {
  const toast = useToast();
  // use end point, will need tournament ID and player ID 
  console.log(tournamentId, databaseId);

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("/api/tournaments/", {tournamentId, databaseId});

    toast({
      title: `You have signed up for ${name}`,
      description: "You will pay on site. Director will be notified.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } catch(err){
    console.log("Could not register", err);
  }


  };
  return (
    <Modal isOpen={isOpen}>
      <Flex h="100vh" justifyContent="center" alignItems="center">
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
                  onClick={handleSubmit}
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

export default RegistrationModal;
