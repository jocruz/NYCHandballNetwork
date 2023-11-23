import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  InputGroup,
  Button,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const Form1 = () => {
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
          <Input id="tournament-name" placeholder="Tournament Name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location" fontWeight={"normal"}>
            Location
          </FormLabel>
          <Input id="location" placeholder="Enter Address or Location" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="number-of-players" fontWeight={"normal"}>
          Number of Players
        </FormLabel>
        <NumberInput min={1}>
          <NumberInputField id="number-of-players" />
        </NumberInput>
      </FormControl>


      <FormControl mt="2%">
        <FormLabel htmlFor="date-of-tournament" fontWeight={"normal"}>
          Date of Tournament
        </FormLabel>
        <Input id="date-of-tournament" type="date" />
      </FormControl>

    </>
  );
};

export default Form1;
