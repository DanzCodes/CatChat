import { Box, Flex, Text } from "./chakra-client-components";

interface IHomeBubbleProps {
  isAuthor: boolean;
  author: string;
  content: string;
  time: string;
}

const HomeBubble = ({ isAuthor, author, content, time }: IHomeBubbleProps) => {
  return (
    <Box
      p={4}
      height="auto"
      w="fit-content"
      maxWidth="32rem"
      borderRadius={12}
      position="relative"
      justifySelf="flex-end"
      className="message-box"
      {...(isAuthor
        ? { alignSelf: "flex-end", bg: "pink" }
        : { bg: "gray.300" })}
    >
      <Box
        borderBottom={`30px solid ${isAuthor ? "pink" : "#CBD5E0"}`}
        className="triangle t-left"
      />
      <Box
        borderBottom={`30px solid ${isAuthor ? "pink" : "#CBD5E0"}`}
        className="triangle t-right"
      />
      <Box
        borderBottom={`30px solid ${isAuthor ? "pink" : "#CBD5E0"}`}
        className={`triangle ${isAuthor ? "b-right" : "b-left"}`}
      />
      <Flex direction="column">
        <Text fontSize={18} fontWeight="semibold">
          {author}
        </Text>
        <Flex columnGap={2}>
          <Text fontSize={32} maxWidth="20rem">
            {content}
          </Text>
          <Text alignSelf="flex-end" fontSize={16} fontWeight="light">
            {time}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeBubble;
