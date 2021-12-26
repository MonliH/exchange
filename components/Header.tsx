import {
  Button,
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  IconButton,
  MenuGroup,
  SkeletonCircle,
  Circle,
  HStack,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Plus, User as UserIcon, MessageSquare, X } from "react-feather";

import Hg from "components/Hourglass";
import { Profile } from "components/User";
import NextLink from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

import { AuthErrorCodes, getAdditionalUserInfo, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Firebase from "lib/firebase";
import { Message } from "components/Chat";
import { User } from "lib/exchange";
import { useAuth } from "lib/auth";
import {
  query,
  orderBy,
  where,
  collection,
  getFirestore,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserInfo } from "lib/chat";
import useDeepCompareEffect from "lib/useDeepEffect";
import { values } from "lodash";

interface WithHeaderProps {}
type SeenMessage = Message & { authorUser: User };

export function Header({}: WithHeaderProps) {
  const [user, loading] = useAuthState(getAuth(Firebase.getApp()));
  const signOut = () => {
    getAuth(Firebase.getApp()).signOut();
  };
  const router = useRouter();
  const { authUser: _user } = useAuth();
  const authUser = _user ? _user : undefined;

  const chatsCol = collection(getFirestore(), "chatLogs");
  const q = query(
    chatsCol,
    orderBy("date", "asc"),
    where("to", "==", authUser ? authUser.uid : "")
  );
  const [seen, setSeen] = useState<undefined | null | SeenMessage[]>(null);

  const [messages, _, error] = useCollection(authUser && q);

  const [newMessages, setNewMessages] = useState<SeenMessage[]>([]);
  const [open, setOpen] = useState(false);

  const markAsRead = () => {
    const newSeen = [...seen, ...newMessages] as SeenMessage[];
    setSeen(newSeen);
    setNewMessages([]);
    setOpen(false);
  };

  const [toDisplay, setToDisplay] = useState<
    (SeenMessage & { unread: boolean })[]
  >([]);

  useDeepCompareEffect(() => {
    setNewMessages((msgs) =>
      msgs.filter(
        (x) =>
          !seen.some((y) => {
            return y.id === x.id;
          })
      )
    );
  }, [seen]);

  useDeepCompareEffect(() => {
    (async () => {
      if (messages) {
        const processed = await Promise.all(
          messages.docs.map(async (d) => {
            return {
              ...d.data(),
              id: d.id,
              authorUser: await getUserInfo(d.data().author),
            } as SeenMessage;
          })
        );
        if (seen === null || seen === undefined) {
          setSeen(processed);
        } else {
          setNewMessages(
            processed.filter(
              (x) =>
                !seen.some((y) => {
                  return y.id === x.id;
                })
            )
          );
        }
      }
    })();
  }, [messages]);

  useDeepCompareEffect(() => {
    const newUnreads = [];
    if (Array.isArray(newMessages)) {
      const newMsgs = [...newMessages];
      newMsgs.sort((a, b) => (a.date as any) - (b.date as any));
      [...new Map(newMsgs.map((item) => [item.author, item])).values()].forEach(
        (v) => {
          newUnreads.push({ ...v, unread: true });
        }
      );
    }
    if (Array.isArray(seen)) {
      const newSeen = [...seen];
      newSeen.sort((a, b) => (a.date as any) - (b.date as any));
      [...new Map(newSeen.map((item) => [item.author, item])).values()].forEach(
        (v) => {
          if (
            !newUnreads.some((x) => {
              return x.author == v.author;
            })
          ) {
            newUnreads.push({ ...v, unread: false });
          }
        }
      );
    }
    setToDisplay(newUnreads);
  }, [seen, newMessages]);

  return (
    <Flex
      maxHeight="73px"
      as="nav"
      bg="white"
      paddingY="8px"
      paddingX="48px"
      borderBottom="1px"
      borderBottomColor="#DADADA"
      position="relative"
      align="center"
    >
      <NextLink href="/" passHref>
        <Heading
          fontWeight="normal"
          mt="-5px"
          fontFamily="Exchange Sans"
          ml="1px"
          fontSize={35}
          cursor="pointer"
          userSelect="none"
        >
          <span style={{ fontSize: 40 }}>E</span>xchange
        </Heading>
      </NextLink>
      <Spacer />
      {user && (
        <Menu isLazy onClose={markAsRead} onOpen={() => setOpen(true)}>
          <MenuButton>
            <IconButton
              aria-label="Messages"
              icon={
                <>
                  <MessageSquare />

                  {newMessages.length > 0 &&
                    !open &&
                    !router.pathname.includes("chat/") && (
                      <Circle
                        position="absolute"
                        width="6px"
                        height="6px"
                        bottom="7px"
                        right="7px"
                        backgroundColor="red"
                      />
                    )}
                </>
              }
              mr="6"
              as="div"
            />
          </MenuButton>
          <MenuList>
            {toDisplay.length ? (
              <MenuGroup title="Messages">
                {toDisplay.map((msg) => {
                  return (
                    <NextLink
                      href={`/chat/${msg.author}`}
                      passHref
                      key={msg.id}
                    >
                      <MenuItem as="a">
                        <HStack>
                          <Profile author={msg.authorUser} size={48} />
                          <Box>
                            <Text
                              fontSize="12px"
                              fontWeight="bold"
                              color="gray.600"
                            >
                              {msg.authorUser.name}
                            </Text>
                            <Text
                              fontSize="15px"
                              color={msg.unread ? "gray.700" : "gray.500"}
                              maxWidth="250px"
                              textOverflow="ellipsis"
                              overflow="hidden"
                              whiteSpace="nowrap"
                            >
                              {msg.message}
                            </Text>
                          </Box>
                        </HStack>
                      </MenuItem>
                    </NextLink>
                  );
                })}
              </MenuGroup>
            ) : (
              <MenuGroup title="You've got no chats"></MenuGroup>
            )}
          </MenuList>
        </Menu>
      )}
      <Menu isLazy>
        <MenuButton
          rightIcon={<Plus size={20} style={{ marginTop: "1px" }} />}
          as={Button}
          colorScheme="teal"
          size="md"
          mr="40px"
        >
          Create
        </MenuButton>
        <MenuList>
          <NextLink href="/create-exchange" passHref>
            <MenuItem>
              <span>Exchange</span>
            </MenuItem>
          </NextLink>
          <NextLink href="/create-request" passHref>
            <MenuItem>
              <span>Request</span>
            </MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
      {loading ? (
        <SkeletonCircle width="45px" height="45px" />
      ) : (
        <>
          {user ? (
            <>
              <Menu isLazy>
                <MenuButton>
                  <Profile
                    author={{
                      name: user.displayName,
                      id: user.uid,
                      pfp: user.photoURL,
                    }}
                    size={45}
                  />
                </MenuButton>
                <MenuList zIndex={11}>
                  <MenuItem onClick={() => router.replace(`/user/${user.uid}`)}>
                    <span>View Profile</span>
                  </MenuItem>
                  <MenuItem onClick={signOut}>
                    <span>Sign Out</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Menu isLazy>
              <MenuButton>
                <Circle width={45} height={45} bg={"gray.300"}>
                  <UserIcon />
                </Circle>
              </MenuButton>
              <MenuList zIndex={11}>
                <MenuGroup title="Demo Account (Limited)">
                  <NextLink href="sign-in" passHref>
                    <MenuItem as="a">
                      <span>Sign In</span>
                    </MenuItem>
                  </NextLink>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}
          <Flex direction="row" align="center" ml="20px">
            <Text fontSize={22} mr="3px" mt="-1px">
              3
            </Text>
            <Hg width={14} height={16} />
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default function withHeader<P extends object>(
  Component: React.ComponentType<P>
) {
  return class WithHeader extends React.Component<
    P & { header: WithHeaderProps }
  > {
    render() {
      const { header, ...props } = this.props;
      return (
        <Flex flexDirection="column" overflow="none" height="100%">
          <Header {...header} />
          <Box flex="1" overflow="auto">
            <Component {...(props as P)} />
          </Box>
        </Flex>
      );
    }
  };
}
