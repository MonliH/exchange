import Head from "next/head";
import Exchanges from "components/Exchanges";

import withHeader from "components/Header";
import { Box, Heading } from "@chakra-ui/react";
import getCards from "lib/getCards";
import ExchangeCard, { ExRequestDisplay } from "components/Exchange";
import getRequests from "lib/getRequests";

function Home() {
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
        <Exchanges cards={getCards()} padding={53} Component={ExchangeCard} />
      </Box>
      <Box>
        <Heading
          fontWeight="normal"
          mb="42px"
          fontFamily="Exchange Sans"
          ml="1px"
        >
          Requests
        </Heading>
        <Exchanges
          cards={getRequests()}
          padding={53}
          Component={ExRequestDisplay}
        />
      </Box>
    </Box>
  );
}

export default withHeader(Home);
