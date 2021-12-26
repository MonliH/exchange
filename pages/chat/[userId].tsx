import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import withHeader from "components/Header";
import withAuth from "lib/auth";
import { useRouter } from "next/router";
import { doc, getFirestore } from "firebase/firestore";
import { ProfileCard } from "components/User";
import GoBack from "components/GoBack";
import Chat from "components/Chat";
import Head from "next/head";

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const db = getFirestore();

  const [snapshot, loading] = useDocumentOnce(
    doc(db, "users", userId as string)
  );

  let user = null;
  if (snapshot !== undefined) {
    user = snapshot.data();
    user.id = userId;
  }

  return (
    <>
      <Head>
        <title>Chat{user && ` with ${user.name}`}</title>
      </Head>
      <Flex direction="row" height="100%" width="100%">
        {!user && snapshot && (
          <>
            <Text mt="6" fontWeight="bold">
              Oops! This user doesn{"'"}t exist.
            </Text>
            <GoBack />
          </>
        )}
        <Chat focusedUser={user} />
      </Flex>
    </>
  );
}

export default withHeader(withAuth(ProfilePage));
