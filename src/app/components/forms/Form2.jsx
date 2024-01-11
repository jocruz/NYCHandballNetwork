import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  GridItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const Form2 = ({ setTotalPlayer, setType, setPrice }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Tournament Details
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Type of Game
        </FormLabel>
        <Select
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => setType(e.target.value)}
        >
          <option>21</option>
          <option>25</option>
          <option>11</option>
        </Select>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="number-of-players" fontWeight={"normal"}>
          Number of Players
        </FormLabel>
        <NumberInput
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(valueAsString, valueAsNumber) =>
            setTotalPlayer(valueAsNumber)
          }
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="number-of-players" fontWeight={"normal"}>
          Entry Fee For Registration
        </FormLabel>
        <NumberInput
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(valueAsString, valueAsNumber) =>
            setPrice(valueAsNumber)
          }
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </>
  );
};

export default Form2;
