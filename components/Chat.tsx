import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "lib/exchange";
import UserView, { Profile } from "./User";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  getFirestore,
  orderBy,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Send } from "react-feather";
import { sendMessage } from "lib/chat";

export interface Message {
  date: Date;
  author: string;
  to: string;
  message: string;
  id: string;
}

export default function Chat({ focusedUser }: { focusedUser: User | null }) {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const chatsCol = collection(getFirestore(), "chatLogs");
  const currentId = getAuth().currentUser.uid;
  const toUserId = focusedUser ? focusedUser.id : "";

  if (focusedUser === null) {
    focusedUser = undefined;
  }
  const request1 = query(
    chatsCol,
    orderBy("date", "asc"),
    where("author", "==", toUserId),
    where("to", "==", currentId)
  );
  const request2 = query(
    chatsCol,
    orderBy("date", "asc"),
    where("author", "==", currentId),
    where("to", "==", toUserId)
  );

  const [chatQuery1] = useCollection(focusedUser && request1);
  const [chatQuery2] = useCollection(focusedUser && request2);

  useEffect(() => {
    if (chatQuery1 !== undefined && chatQuery2 !== undefined) {
      const messages = chatQuery1.docs
        .map((e) => ({ ...e.data(), id: e.id } as Message))
        .concat(
          chatQuery2.docs.map((e) => ({ ...e.data(), id: e.id } as Message))
        );
      messages.sort((a, b) => {
        const aDate = a.date ?? new Date();
        const bDate = b.date ?? new Date();
        return (aDate as any) - (bDate as any);
      });
      setMessages(messages);
    }
  }, [chatQuery1, chatQuery2]);

  const dummy = useRef<HTMLSpanElement>();

  const [formValue, setFormValue] = useState("");
  const sendMsg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(formValue, currentId, toUserId, () => {
      setFormValue("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  const _user = getAuth().currentUser;
  const currentUser = {
    name: _user.displayName,
    pfp: _user.photoURL,
    id: _user.uid,
  };

  return (
    <Flex direction="row" width="100%" p="0" height="100%">
      <VStack height="100%" p="4" flexGrow={1} align="left" maxHeight="100%">
        <Skeleton isLoaded={focusedUser !== undefined} flexShrink={0}>
          <Box
            fontWeight="bold"
            borderBottomColor="gray.200"
            borderBottomWidth="1px"
            pb="15px"
          >
            <UserView
              size={50}
              user={
                focusedUser ?? { name: "Jonathan Li", id: "asjdaowidhaoiwf" }
              }
            />
          </Box>
        </Skeleton>
        <VStack
          flexGrow={1}
          align="left"
          spacing={4}
          overflow="scroll"
          overflowX="hidden"
        >
          {messages &&
            messages.map((m, idx) => {
              const user = m.author === currentId ? currentUser : focusedUser;
              return (
                <HStack key={idx}>
                  <Profile author={user} size={45} />
                  <Box>
                    <Text fontSize={14} fontWeight={"bold"}>
                      {user.name}
                    </Text>
                    <Text>{m.message}</Text>
                  </Box>
                </HStack>
              );
            })}
          <span ref={dummy}></span>
        </VStack>
        <Skeleton isLoaded={focusedUser !== undefined} flexShrink={0}>
          <form onSubmit={sendMsg}>
            <HStack>
              <Button
                leftIcon={<Send />}
                colorScheme="blue"
                size="lg"
                disabled={!formValue}
                type="submit"
              >
                Send
              </Button>
              <Input
                size="lg"
                value={formValue}
                onChange={(e) => {
                  e.preventDefault();
                  setFormValue(e.target.value);
                }}
                placeholder={`Message @${focusedUser ? focusedUser.name : ""}`}
                borderColor="gray.300"
              />
            </HStack>
          </form>
        </Skeleton>
      </VStack>
    </Flex>
  );
}
