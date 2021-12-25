import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import {
  useCollectionOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import withHeader from "components/Header";
import withAuth from "lib/auth";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ProfileCard } from "components/User";
import { ExchangeInfo, ExRequest, WithKey } from "lib/exchange";
import ExchangeCard, {
  CARD_HEIGHT,
  CARD_WIDTH,
  ExRequestDisplay,
} from "components/Exchange";
import Exchanges from "components/Exchanges";
import GoBack from "components/GoBack";

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

  const exchangeCol = collection(db, "exchanges");
  const q = query(
    exchangeCol,
    orderBy("likes", "desc"),
    where("authorUid", "==", userId)
  );
  const [exchanges, loadingE] = useCollectionOnce(snapshot && q);
  let processedExchanges = null;
  if (exchanges) {
    processedExchanges = exchanges.docs.map((v) => {
      const data = v.data();
      return {
        description: data.description,
        author: { name: user.name, id: user.id, pfp: user.pfp },
        likes: data.likes,
        time: data.time,
        type: data.type,
        key: v.id,
        place: { remote: data.remote, location: data.location },
      } as ExchangeInfo & WithKey;
    });
  }
  processedExchanges =
    snapshot && !snapshot.exists() ? null : processedExchanges;

  const requestsCol = collection(db, "requests");
  const requestsQ = query(
    requestsCol,
    orderBy("likes", "desc"),
    where("authorUid", "==", userId)
  );
  const [requests, loadingR] = useCollectionOnce(snapshot && requestsQ);
  let processedRequests = null;
  if (requests) {
    processedRequests = requests.docs.map((v) => {
      const data = v.data();
      return {
        description: data.description,
        author: { name: user.name, id: user.id, pfp: user.pfp },
        likes: data.likes,
        time: data.time,
        type: data.type,
        key: v.id,
        place: { remote: data.remote, location: data.location },
      } as ExRequest & WithKey;
    });
  }
  processedRequests = snapshot && !snapshot.exists() ? null : processedRequests;

  const mapWidth = (n: number) => n - 50 - 454 - 50;

  return (
    <Flex p="50px" direction="row">
      <Box flexShrink={0}>
        {!user ? (
          <>
            <Skeleton width={454} height={585} />
            {snapshot && (
              <>
                <Text mt="6" fontWeight="bold">
                  Oops! This user doesn{"'"}t exist.
                </Text>
                <GoBack />
              </>
            )}
          </>
        ) : (
          <ProfileCard author={user} />
        )}
      </Box>
      <Box flexGrow={1} ml="50px">
        <Box mb="10">
          {(processedExchanges === null ||
            (Array.isArray(processedExchanges) &&
              processedExchanges.length != 0)) && (
            <>
              <Skeleton isLoaded={processedExchanges !== null}>
                <Heading fontWeight="normal" mb="30px" ml="1px">
                  Exchanges
                </Heading>
              </Skeleton>
              <Exchanges
                cards={processedExchanges}
                mapWidth={mapWidth}
                Component={ExchangeCard}
                componentDims={[CARD_WIDTH, CARD_HEIGHT]}
              />
            </>
          )}
        </Box>
        {(processedRequests === null ||
          (Array.isArray(processedRequests) &&
            processedRequests.length != 0)) && (
          <>
            <Skeleton isLoaded={processedRequests !== null}>
              <Heading fontWeight="normal" mb="30px" ml="1px">
                Requests
              </Heading>
            </Skeleton>
            <Exchanges
              cards={processedRequests}
              mapWidth={mapWidth}
              Component={ExRequestDisplay}
              componentDims={[CARD_WIDTH, CARD_HEIGHT]}
            />
          </>
        )}
      </Box>
    </Flex>
  );
}

export default withHeader(withAuth(ProfilePage));
