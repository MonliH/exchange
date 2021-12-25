import { Box } from "@chakra-ui/react";
import Head from "next/head";

import withHeader from "components/Header";
import { ExchangeType } from "lib/exchange";
import { FormEvent, useMemo, useState } from "react";
import ExchangePage from "components/CreateContent";

function CreateExchange() {
  const [sliderValue, setSliderValue] = useState(1);
  const [location, setLocation] = useState<null | string>(null);
  const [category, setCategory] = useState<undefined | ExchangeType>(undefined);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.target[0].value;
    console.log({ description, location, category, sliderValue });
  };

  return (
    <Box height="100%">
      <Head>
        <title>Create an Exchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ExchangePage
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        submitForm={submitForm}
        location={location}
        setLocation={setLocation}
        category={category}
        setCategory={setCategory}
      />
    </Box>
  );
}

export default withHeader(CreateExchange);
