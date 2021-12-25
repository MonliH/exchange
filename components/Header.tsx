import {
  Button,
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { Plus } from "react-feather";

import Hg from "components/Hourglass";
import { Profile } from "components/User";
import NextLink from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

import Firebase from "lib/firebase";
import { getAuth } from "firebase/auth";

interface WithHeaderProps {}
export function Header({}: WithHeaderProps) {
  const [user, loading, error] = useAuthState(getAuth(Firebase.getApp()));
  const signOut = () => {
    getAuth(Firebase.getApp()).signOut();
  };

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
        <CircularProgress isIndeterminate />
      ) : (
        <>
          {user ? (
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
                <MenuItem onClick={signOut}>
                  <span>Sign Out</span>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Menu isLazy>
              <MenuButton>
                <Profile
                  author={{ name: "Jonathan Li", id: 10231 }}
                  size={45}
                />
              </MenuButton>
              <MenuList zIndex={11}>
                {/* <MenuItem onClick={signOut}>
                  <span>Sign In</span>
                </MenuItem> */}
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
