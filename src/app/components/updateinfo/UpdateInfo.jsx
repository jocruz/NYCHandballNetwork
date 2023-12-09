"use client";
import { useState, useEffect } from "react";
import { Input, Button, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const UpdateInfo = () => {
  const toast = useToast();
  const { user } = useUser();
  console.log(user.emailAddresses[0].emailAddress); // get current email address of logged in user
  const currentUserEmail = user.emailAddresses[0].emailAddress;
  const [homePark, setHomePark] = useState("");
  const [currentPark, setCurrentPark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setuserId] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get('role')

  const apiEndPoint = search === 'player' ? '/api/players' : '/api/tournamentdirectors'
  console.log(apiEndPoint);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${apiEndPoint}?email=${currentUserEmail}`
        );
        console.log(response.data.player.id);
        setuserId(response.data.player.id);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userUpdateData = {};
      if (search === 'player'){
        if (homePark !== "") {
          userUpdateData.homePark = homePark;
        }
        if (currentPark !== "") {
          userUpdateData.currentPark = currentPark;
        }
      }
      else{
        if (phoneNumber !== ""){
          userUpdateData.phoneNumber = phoneNumber;
        }
      }
      
      await axios.put( `${apiEndPoint}?id=${userId}`, userUpdateData);
      console.log("Court data updated successfully");
      setCurrentPark("");
      setHomePark("");
      setPhoneNumber("");
      toast({
        title: "Information updated.",
        description: "We've updated your information for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating court data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {" "}
          {/* Adjust the spacing value as needed */}
          <div>
            <label htmlFor="homePark">Home Court:</label>
            <Input
              placeholder="Where did you start playing handball?"
              size="sm"
              value = {homePark}
              onChange={(e) => setHomePark(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentPark">Current Court:</label>
            <Input
              placeholder="Where do you currently play the most?"
              size="sm"
              value = {currentPark}
              onChange={(e) => setCurrentPark(e.target.value)}
            />
          </div>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            spinnerPlacement="start"
            loadingText="Making Changes"
            type="submit"
          >
            Submit Changes
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UpdateInfo;

// Request Body

//     Used With: Typically associated with POST and PUT requests.
//     Best For: Sending large amounts of data, complex JSON structures, or sensitive data. The request body is not exposed in URL history or server logs, which makes it more secure for sensitive information.
//     Example: Submitting a form with detailed user information, updating a resource with several fields.

// Query Parameters

//     Used With: Commonly used with GET requests.
//     Best For: Simple, less sensitive data. Ideal for filtering, sorting, or specifying certain resources in API requests. Since query parameters are visible in the URL, they are more exposed and less secure compared to the request body.
//     Example: Searching for a resource by a specific attribute, like an email in your case, retrieving a specific page of a paginated list.
