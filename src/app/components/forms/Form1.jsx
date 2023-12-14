import { useState } from "react";
import { FormControl, FormLabel, Input, Heading, Flex } from "@chakra-ui/react";

const Form1 = ({ setName, setDate, setLocation }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Tournament Registration
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="tournament-name" fontWeight={"normal"}>
            Name of Tournament
          </FormLabel>
          <Input
            id="tournament-name"
            placeholder="Tournament Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location" fontWeight={"normal"}>
            Location
          </FormLabel>
          <Input
            id="location"
            placeholder="Enter Address or Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="date-of-tournament" fontWeight={"normal"}>
          Date of Tournament
        </FormLabel>
        <Input
          id="date-of-tournament"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
    </>
  );
};

export default Form1;
