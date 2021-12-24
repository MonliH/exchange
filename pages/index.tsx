import Head from "next/head";
import Cards from "components/Cards";

import withHeader from "components/Header";
import { Box, Heading } from "@chakra-ui/react";
import getCards from "lib/getCards";

function Home() {
  return (
    <Box p="53px" pr="0px">
      <Head>
        <title>Exchange</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading fontWeight="normal" mb="42px">
        Exchanges
      </Heading>
      <Cards cards={getCards()} />
    </Box>
  );
}

export default withHeader(Home);
