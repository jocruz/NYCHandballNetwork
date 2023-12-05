"use client";
import { useState, useEffect } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const TestComp = () => {
  const { user } = useUser();
  console.log(user.emailAddresses[0].emailAddress); // get current email address of logged in user
  const currentUserEmail = user.emailAddresses[0].emailAddress;
  const [homePark, sethomePark] = useState("");
  const [currentPark, setcurrentPark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    const fetchCurrentPlayer = async () => {
      try {
        const response = await axios.get(
          `/api/players?email=${currentUserEmail}`
        );
        console.log(response.data.player.id);
        setPlayerId(response.data.player.id);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };
    fetchCurrentPlayer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const courtData = {};
      if (homePark !== "") {
        courtData.homePark = homePark;
      }
      if (currentPark !== "") {
        courtData.currentPark = currentPark;
      }
      await axios.put(`/api/players?id=${playerId}`, courtData);
      console.log("Court data updated successfully");
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
              onChange={(e) => sethomePark(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentPark">Current Court:</label>
            <Input
              placeholder="Where do you currently play the most?"
              size="sm"
              onChange={(e) => setcurrentPark(e.target.value)}
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

export default TestComp;

// Request Body

//     Used With: Typically associated with POST and PUT requests.
//     Best For: Sending large amounts of data, complex JSON structures, or sensitive data. The request body is not exposed in URL history or server logs, which makes it more secure for sensitive information.
//     Example: Submitting a form with detailed user information, updating a resource with several fields.

// Query Parameters

//     Used With: Commonly used with GET requests.
//     Best For: Simple, less sensitive data. Ideal for filtering, sorting, or specifying certain resources in API requests. Since query parameters are visible in the URL, they are more exposed and less secure compared to the request body.
//     Example: Searching for a resource by a specific attribute, like an email in your case, retrieving a specific page of a paginated list.
