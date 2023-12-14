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
          defaultValue={21}
          min={11}
          max={25}
          onChange={(e) => setTotalPlayer(e.target.value)}
        >
          <NumberInputField id="number-of-players" />
        </NumberInput>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Entry Fee Price
        </FormLabel>
        <Input
          type="number"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </FormControl>
    </>
  );
};

export default Form2;
