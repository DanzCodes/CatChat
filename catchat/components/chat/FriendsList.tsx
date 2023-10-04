import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import {
  Box,
  Img,
  Flex,
  Text,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "../chakra-client-components";

interface IFriendsList {
  image: string;
  nickname: string;
  lastMessage: string;
}

const ChatArrow = ({ image, nickname, lastMessage }: IFriendsList) => {
  return (
    <Flex
      alignItems="center"
      columnGap={4}
      p={2}
      rounded="md"
      _hover={{
        bgColor: "#232323",
        cursor: "pointer",
      }}
    >
      <Box>
        <Img
          rounded="full"
          w={[12, 12, 8, 10, 12]}
          h={[12, 12, 8, 10, 12]}
          src={image}
        />
      </Box>
      <Flex direction="column" color="white">
        <Text fontSize={["md", "md", "sm", "md"]} fontWeight="bold">
          {nickname}
        </Text>
        <Text fontSize={["sm", "sm", "xs", "sm"]} color="gray.300">
          {lastMessage.slice(0, 22)}...
        </Text>
      </Flex>
    </Flex>
  );
};

const FriendsList = ({ friends }: { friends: IFriendsList[] }) => {
  return (
    <Flex
      bg="#181818"
      p={4}
      columnGap={2}
      rowGap={4}
      w={["full", "full", 96]}
      direction="column"
    >
      <Stack
        direction="row"
        justifyItems="center"
        alignItems="center"
        color="gray.300"
        _focus={{
          color: "pink.300",
        }}
      >
        <Icon
          fontWeight="bold"
          fontSize={22}
          _hover={{
            cursor: "pointer",
            color: "pink.300",
          }}
        >
          <AiOutlineMenu />
        </Icon>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input
            _focus={{
              border: "1px solid",
              borderColor: "pink.300",
            }}
            _hover={{
              border: "1px solid",
              borderColor: "pink.300",
            }}
            bg="#242424"
            type="text"
            border="none"
            placeholder="Search"
            borderColor="pink.300"
          />
        </InputGroup>
      </Stack>
      <Stack>
        {friends.map((friend) => (
          <ChatArrow
            image={friend.image}
            nickname={friend.nickname}
            lastMessage={friend.lastMessage}
          />
        ))}
      </Stack>
    </Flex>
  );
};

export default FriendsList;
