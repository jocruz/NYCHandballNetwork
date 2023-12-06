
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
} from "@chakra-ui/react";

const PlayerCard = ({ name, categoryRank, overallRank,currentPark,homePark }) => {
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
          <Text>
            Rank:{categoryRank}
          </Text>
          <Text>
          HomePark:{homePark}
          </Text>
          <Text>
          Currently Playing at: {currentPark}
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="teal" variant="solid">
            Bio
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default PlayerCard;
