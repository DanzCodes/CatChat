"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IMessage, IWriting } from "../../../components/ChatContainer";
import {
  Box,
  Flex,
  useMediaQuery,
} from "../../../components/chakra-client-components";
import { userContextStore } from "../../../store/userStore";
import FriendsList from "../../../components/chat/FriendsList";
import LandingChat from "../../../components/chat/LandingChat";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [writing, setWriting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, selectedChat } = userContextStore();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [channelWriting, setChannelWriting] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setWriting(false), 1700);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    socket.on("message", (message: IMessage) =>
      setMessages((prev) => [{ ...message }, ...prev])
    );

    socket.on("writing", ({ isTyping, author }: IWriting) => {
      console.log({ isTyping, author });
      if (isTyping) setChannelWriting(`${author} is typing...`);
      else setChannelWriting("");
    });
  }, []);

  const writingMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!writing) setWriting(true);
  };

  useEffect(() => {
    const data: IWriting = {
      author: user.nickname,
      isTyping: writing,
    };
    socket.emit("writing", data);
  }, [writing]);

  const handleSubmit = () => {
    if (!message) return;
    const minutes = new Date().getMinutes();
    const data: IMessage = {
      isAuthor: false,
      content: message,
      author: user.nickname,
      time:
        new Date().getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes),
    };

    socket.emit("message", data);
    setMessages((prev) => [{ ...data, isAuthor: true }, ...prev]);
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
      setMessage("");
    }
  };

  return (
    <main>
      {/* Chats list */}
      <Box w="100vw" h="100vh" pt={14}>
        <Flex h="full">
          {isMobile ? (
            <>
              {!selectedChat ? (
                <FriendsList
                  friends={[
                    {
                      image:
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbestprofilepictures.com%2Fwp-content%2Fuploads%2F2021%2F08%2FAmazing-Profile-Picture-768x832.jpg",
                      nickname: "LocuraMamaguebaso63",
                      lastMessage: "Se me quemo el arroz mamaguebo",
                    },
                  ]}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <FriendsList
                friends={[
                  {
                    image:
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbestprofilepictures.com%2Fwp-content%2Fuploads%2F2021%2F08%2FAmazing-Profile-Picture-768x832.jpg",
                    nickname: "LocuraMamaguebaso63",
                    lastMessage: "Se me quemo el arroz mamaguebo",
                  },
                ]}
              />
              {selectedChat ? <></> : <LandingChat />}
            </>
          )}
        </Flex>
      </Box>
    </main>
  );
};

export default Chat;

/*

<Flex h="100%" direction="column" rowGap="4">
          <ChatContainer messages={messages} />
          <Text color="gray.300" fontWeight="semibold" fontSize="sm">{channelWriting}</Text>
          <Input
            ref={inputRef}
            onKeyDown={(e) => {
              e.code === "Enter" && handleSubmit();
            }}
            color="white"
            focusBorderColor="pink.300"
            onChange={writingMessage}
            placeholder="Input your text here"
          />
        </Flex>

*/
