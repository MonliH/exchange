import Head from "next/head";
import Exchanges from "components/Exchanges";

import withHeader from "components/Header";
import { Box, Heading } from "@chakra-ui/react";
import getExchanges from "lib/getExchanges";
import ExchangeCard, {
  CARD_HEIGHT,
  CARD_WIDTH,
  ExRequestDisplay,
} from "components/Exchange";
import getRequests from "lib/getRequests";
import { useEffect, useState } from "react";

function Home() {
  const [exchanges, setExchanges] = useState(null);
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    if (exchanges === null) {
      getExchanges().then((es) => {
        setExchanges(es);
      });
    }
    if (requests === null) {
      getRequests().then((es) => {
        setRequests(es);
      });
    }
  }, []);
  return (
    <Box p="53px" pr="0px" pt="35px">
      <Head>
        <title>Exchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mb="75px">
        <Heading fontWeight="normal" mb="42px" ml="1px">
          Exchanges for you
        </Heading>
        <Exchanges
          cards={exchanges}
          padding={53}
          Component={ExchangeCard}
          componentDims={[CARD_WIDTH, CARD_HEIGHT]}
        />
      </Box>
      <Box>
        <Heading fontWeight="normal" mb="42px" ml="1px">
          Requests
        </Heading>
        <Exchanges
          cards={requests}
          padding={53}
          Component={ExRequestDisplay}
          componentDims={[CARD_WIDTH, 190]}
        />
      </Box>
    </Box>
  );
}

export default withHeader(Home);
