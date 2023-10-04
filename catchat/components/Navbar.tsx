"use client";

import {
  Flex,
  Text,
  Button,
} from "./chakra-client-components";
import { userContextStore } from "../store/userStore";

const Navbar = () => {
  const { isAuth, user } = userContextStore();

  return (
    <nav style={{ position: "relative" }}>
      <Flex
        position="fixed"
        w="full"
        justifyContent="space-between"
        color="white"
        py={4}
        px={12}
        backdropFilter="blur(5px)"
      >
        <Text>Catchat</Text>
        {isAuth ? (
          <Text>{user.username}</Text>
        ) : (
          <Flex columnGap={4}>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              border="2px solid #F687B3"
              bg="pink.300"
              href={"/register"}
              _hover={{
                bg: "transparent",
                color: "pink.300"
              }}
            >
              Sign Up
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color="pink.300"
              bg="transparent"
              border="2px solid #F687B3"
              href={"/login"}
              _hover={{
                color: "white",
                bg: "pink.300",
              }}
            >
              Log in
            </Button>
          </Flex>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;