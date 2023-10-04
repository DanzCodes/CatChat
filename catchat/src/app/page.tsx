import HomeBubble from "../../components/HomeBubble";
import {
  Center,
  Text,
  Flex,
  Image,
} from "../../components/chakra-client-components";

const Home = () => {
  return (
    <main>
      <Center
        h="100vh"
      >
        <Flex
          w="50%"
          rowGap={12}
          justifyItems="center"
          alignItems="center"
          direction="column"
        >
          <Flex color="white" justifyItems="center" alignContent="center">
            <Text fontSize="5xl" fontWeight="bold">
              Cat
            </Text>
            <Image w={12} h={12} m="auto" src="/images/cat-head.png" />
            <Text fontSize="5xl" fontWeight="bold">
              Chat
            </Text>
          </Flex>
          <Flex w="full" direction="column" rowGap={12}>
            <HomeBubble
              isAuthor={false}
              author="Cat"
              content="Hey!, how are you?"
              time="11:09"
            />
            <HomeBubble
              isAuthor={true}
              author="Dani"
              content="Oh, hi! I'm good thank you, what about you?"
              time="11:09"
            />
            <HomeBubble
              isAuthor={false}
              author="Cat"
              content="I'm fine thank you ^^"
              time="11:10"
            />
            <HomeBubble
              isAuthor={false}
              author="Cat"
              content="What're you doing?"
              time="11:10"
            />
          </Flex>
        </Flex>
      </Center>
    </main>
  );
};

export default Home;
