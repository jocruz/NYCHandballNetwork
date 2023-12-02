"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const handlePlayerSignUp = async () => {
    // Use Clerk to initiate the sign-up process
    // Pass 'player' as metadata or a query parameter to your backend
  };

  // Function to handle tournament director sign up
  const handleDirectorSignUp = async () => {
    // Use Clerk to initiate the sign-up process
    // Pass 'tournament_director' as metadata or a query parameter to your backend
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Popover>
            <PopoverTrigger>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"gray.500"}
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign in
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <Link href="/sign-in/player?role=player">
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"#"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Player Sign In
                  </Button>
                </Link>
                <Link href="/sign-in/player?role=director">
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"#"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Tournament Director Sign In
                  </Button>
                </Link>
              </PopoverContent>
            </Portal>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <Link href="/sign-up/player?role=player">
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"#"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Player Sign Up
                  </Button>
                </Link>
                <Link href="/sign-up/player?role=director">
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"#"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Tournament Director Sign Up
                  </Button>
                </Link>
              </PopoverContent>
            </Portal>
          </Popover>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
