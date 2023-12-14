"use client";
import { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  Progress,
  useToast,
} from "@chakra-ui/react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const MultistepForm = () => {
  // const [directorId, setDirectorId] = useState(null);
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  //These are the states we'll be managing in the other forms.
  //Form 1
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  //Form 2
  const [totalPlayers, setTotalPlayer] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);

  //Form 3
  const [fbUrl, setFbUrl] = useState("");
  const { user } = useUser();
  // const currentUserEmail = user.emailAddresses[0].emailAddress;
  const test = user // using the useUser hook to get the user object to then use the user object to get the publicMetadata
  const userDatabaseId = user.publicMetadata.databaseId;
  console.log(user.publicMetadata.databaseId);
  const tournamentData = {
    name,
    date,
    location,
    totalPlayers,
    type,
    price,
    userDatabaseId,
  };

  if (!user) {
    // Return null, a loading indicator, or handle the lack of user data appropriately
    return <div>Loading user data...</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("/api/tournaments/", tournamentData);
      toast({
        title: "Account created.",
        description: "You've successfully created a tournament!.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      //Router.push(); // change the url query on the other nav items on the sidebar;
    } catch (err) {
      console.log("There was an error creating a tournament", err);
    }
  };

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/tournamentdirectors?email=${currentUserEmail}`
  //       );
  //       console.log(response.data.director.id);
  //       setDirectorId(response.data.director.id);
  //     } catch (error) {
  //       console.error("Error fetching director data:", error);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {/* form control */}
        {step === 1 ? (
          <Form1
            setName={setName}
            setDate={setDate}
            setLocation={setLocation}
          />
        ) : step === 2 ? (
          <Form2
            setTotalPlayer={setTotalPlayer}
            setType={setType}
            setPrice={setPrice}
          />
        ) : (
          <Form3 setFbUrl={setFbUrl} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1); // go back to a previous form
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1); // move to a different form
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default MultistepForm;
