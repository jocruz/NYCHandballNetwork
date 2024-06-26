"use client";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import { HiMiniTrophy } from "react-icons/hi2";
import CreateTournamentPage from "@/app/createTournament/page";
import DirectorTournaments from "../tournaments/DirectorTournaments";
import PlayerTournaments from "@/app/components/tournaments/playerTournaments";
import TournamentBracket from "../tournaments/TournamentBracket";
import MatchesManager from "../tournaments/MatchesManager";
import Matches from "../matches/matches";

const DirectorLinkItems = [
  // { name: "Home", icon: FiHome },
  { name: "My Tournaments", icon: FiTrendingUp },
  { name: "Create Tournament", icon: FiCompass },
  { name: "Assign Matches", icon: FiCompass },
  { name: "Matches Manager", icon: FiCompass },
];
const PlayerLinkItems = [
  { name: "Home", icon: FiHome },
  { name: "My Tournaments", icon: FiTrendingUp },
  { name: "Active Tournaments", icon: FiCompass },
];

const SidebarContent = ({ onClose, onSetActive, user, ...rest }) => {
  const userLinks =
    user.publicMetadata.role === "director"
      ? DirectorLinkItems
      : PlayerLinkItems;

  useEffect(() => {
    console.log("SideBar.jsx Mounted", user);

    return () => {
      console.log("sideBar.jsx Unmounting");
    };
  }, []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {userLinks.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            onSetActive(link.name);
            onClose();
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, onClick, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <HiMiniTrophy />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user.emailAddresses[0].emailAddress}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.publicMetadata.role === "director" &&
                      "Tournament Director"}
                    {user.publicMetadata.role === "player" && "Active Player"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState("My Tournaments");

  return (
    //useColorModeValue is a chakra color hook that provide lightMode,darkMode value
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        onSetActive={setActiveComponent}
        display={{ base: "none", md: "block" }}
        user={user}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} onSetActive={setActiveComponent} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content goes here that goes inside of the clicked tab on the dashboard */}
        <div>
          {activeComponent === "Create Tournament" &&
            user.publicMetadata.role === "director" && <CreateTournamentPage />}
          {activeComponent === "My Tournaments" &&
            user.publicMetadata.role === "director" && (
              <DirectorTournaments user={user} />
            )}
          {activeComponent === "Active Tournaments" &&
            user.publicMetadata.role === "player" && (
              <PlayerTournaments user={user} />
            )}
          {activeComponent === "Assign Matches" &&
            user.publicMetadata.role === "director" && (
              <MatchesManager user={user} />
            )}
          {activeComponent === "Matches Manager" &&
            user.publicMetadata.role === "director" && <Matches />}
        </div>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
