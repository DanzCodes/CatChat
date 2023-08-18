"use client";

import { Center, Button, Text, Box, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <main>
      <Box
        w="100vw"
        h="100vh"
        bgSize="cover"
        bgImage="/images/cat-wallpaper.jpeg"
      >
        <Center h="full" mr="40%">
          <Flex rowGap="4" direction="column" color="white" w="md">
            <Text fontSize="4xl">CatChat</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
              praesentium commodi. Et iste numquam aliquid atque tempore
              recusandae sed, repudiandae, fuga odit quaerat consectetur
              sapiente fugit quo dignissimos, voluptates facere.
            </Text>
            <Button
              w="32"
              bg="#27374D"
              color="white"
              _hover={{
                bg: "#131e2d",
              }}
            >
              Sign Up
            </Button>
          </Flex>
        </Center>
      </Box>
    </main>
  );
};

export default Home;
