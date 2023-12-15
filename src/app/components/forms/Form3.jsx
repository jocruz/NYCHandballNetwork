import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Heading,
  SimpleGrid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
} from "@chakra-ui/react";

const Form3 = ({ setFbUrl }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Facebook Event URL
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
              onChange={(e) => {
                setFbUrl(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormHelperText>
          <Text as='b' fontSize='lg'> Many handball tournaments are organized using Facebook events. If
            you have created a Facebook event for your tournament, you can
            include its URL here. This allows players to access all event
            details directly from Facebook.</Text>
            <br/>
            <br/>
          <Text as='i'fontSize='lg'> However, providing a Facebook event
            link is optional.</Text>
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};
export default Form3;
