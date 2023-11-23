"use client";
import {
  Heading,
  Card,
  CardHeader,
  Text,
  Flex,
  Button,
  CardFooter,
  CardBody,
  Image,
  Divider,
  Spacer,
} from "@chakra-ui/react";

const TournamentCard = ({ name, type, location,date }) => {
  return (
    <Flex direction="row" wrap="wrap" justify="center" align="center">
      <Card align="center" size="md">
        <CardHeader>
          <Heading size="md"> {name}</Heading>
          <Divider />
        </CardHeader>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
          alt={name}
        />
        <CardBody>
        <Text fontSize='5xl' color='tomato'>
            {date} 
          </Text>
          <Text fontSize='5xl' color='tomato'>
            {type} 
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="teal" variant="solid">
            {location}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default TournamentCard;
