import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from "lib/firebase";
import { useState } from "react";
import GoBack from "./GoBack";

export default function SignIn() {
  const [error, setError] = useState<null | FirebaseError>(null);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(Firebase.getApp()), provider).catch((e) => {
      setError(e);
    });
  };
  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      justify="center"
      bg="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(4px)"
    >
      <Box p="5" bg="gray.100" borderRadius={4} maxWidth="400px">
        <Heading mb="2">Sign in</Heading>
        <Text mb="5">
          You must sign in to continue. Please make an account with Google
          below.
        </Text>
        <Flex>
          <GoBack />
          <Button
            size="lg"
            colorScheme="blue"
            onClick={signInWithGoogle}
            ml="5"
          >
            Sign In with Google
          </Button>
        </Flex>
        {error && (
          <Text color="red" mt="4">
            An error occured. Please try again.
          </Text>
        )}
      </Box>
    </Flex>
  );
}
