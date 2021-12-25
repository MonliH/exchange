import { Box } from "@chakra-ui/react";
import withHeader from "components/Header";
import SignIn from "components/SignIn";
import { useRouter } from "next/router";

function SignInPage() {
  const router = useRouter();
  return (
    <Box height="100%">
      <SignIn
        text={"Sign in with Google to unlock more features."}
        onSignIn={() => {
          router.replace("/");
        }}
      />
    </Box>
  );
}

export default withHeader(SignInPage);
