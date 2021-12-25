import { Box } from "@chakra-ui/react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import withHeader from "components/Header";
import withAuth from "lib/auth";
import { useRouter } from "next/router";
import { doc, getFirestore } from "firebase/firestore";
import { ProfileCard } from "components/Profile";

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;

  const [snapshot, loading, error] = useDocumentOnce(
    doc(getFirestore(), "users", userId as string)
  );

  console.log(snapshot);

  return <Box></Box>;
}

export default withHeader(withAuth(ProfilePage));
