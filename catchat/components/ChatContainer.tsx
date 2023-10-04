import { userContextStore } from "../store/userStore";
import { Box, Flex, Text } from "./chakra-client-components";

export interface IMessage {
  time: string;
  author: string;
  content: string;
  isAuthor: boolean;
}

export interface IWriting extends Pick<IMessage, "author"> {
  isTyping: boolean;
}

const ChatContainer = ({ messages }: { messages: IMessage[] }) => {
  const {
    user: { nickname },
  } = userContextStore();
  const Message = ({ time, content, author }: IMessage) => (
    <Box
      p={4}
      height="auto"
      w="fit-content"
      maxWidth="24rem"
      borderRadius={12}
      position="relative"
      justifySelf="flex-end"
      className="message-box"
      {...(author == nickname
        ? { alignSelf: "flex-end", bg: "pink" }
        : { bg: "gray.300" })}
    >
      <Box
        borderBottom={`30px solid ${author == nickname ? "pink" : "#CBD5E0"}`}
        className="triangle t-left"
      />
      <Box
        borderBottom={`30px solid ${author == nickname ? "pink" : "#CBD5E0"}`}
        className="triangle t-right"
      />
      <Box
        borderBottom={`30px solid ${author == nickname ? "pink" : "#CBD5E0"}`}
        className={`triangle ${author == nickname ? "b-right" : "b-left"}`}
      />
      <Flex direction="column">
        <Text fontSize={12} fontWeight="semibold">
          {author}
        </Text>
        <Flex columnGap={2}>
          <Text maxWidth="20rem">{content}</Text>
          <Text alignSelf="flex-end" fontSize="xs" fontWeight="light">
            {time}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );

  return (
    <Flex
      p={4}
      w="full"
      h="full"
      rowGap={12}
      overflowY="auto"
      scrollBehavior="smooth"
      direction="column-reverse"
      className="messages-container"
    >
      {messages.map((message, i) => (
        <Message
          time={message.time}
          author={message.author}
          content={message.content}
          isAuthor={message.isAuthor}
        />
      ))}
    </Flex>
  );
};

export default ChatContainer;
