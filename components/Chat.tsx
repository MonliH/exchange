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
import UserView from "./User";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  getFirestore,
  orderBy,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Send } from "react-feather";

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

  const [chatQuery1, _, error] = useCollection(focusedUser && request1);
  const [chatQuery2] = useCollection(focusedUser && request2);
  console.log(error);

  useEffect(() => {
    if (chatQuery1 !== undefined && chatQuery2 !== undefined) {
      const messages = chatQuery1.docs
        .map((e) => ({ ...e.data(), id: e.id } as Message))
        .concat(
          chatQuery2.docs.map((e) => ({ ...e.data(), id: e.id } as Message))
        );
      console.log(messages);
      setMessages(messages);
    }
  }, [chatQuery1, chatQuery2]);

  const dummy = useRef<HTMLSpanElement>();

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(chatsCol, {
      message: formValue,
      date: serverTimestamp(),
      author: currentId,
      to: toUserId,
    })
      .then(() => {
        setFormValue("");
        dummy.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Flex direction="row" width="100%" p="0" height="100%">
      <VStack height="100%" p="4" flexGrow={1} align="left">
        <Skeleton isLoaded={focusedUser !== undefined} flexShrink={0}>
          <Box fontWeight="bold">
            <UserView
              size={50}
              user={
                focusedUser ?? { name: "Jonathan Li", id: "asjdaowidhaoiwf" }
              }
            />
          </Box>
        </Skeleton>
        <VStack flexGrow={1}>
          {messages &&
            messages.map((m, idx) => {
              return <Text key={idx}>{m.message}</Text>;
            })}
          <span ref={dummy}></span>
        </VStack>
        <Skeleton isLoaded={focusedUser !== undefined} flexShrink={0}>
          <form onSubmit={sendMessage}>
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
