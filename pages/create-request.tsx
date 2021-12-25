import {
  FormControl,
  FormLabel,
  InputGroup,
  Text,
  InputLeftElement,
  Input,
  Box,
  Heading,
  Flex,
  Tooltip,
  Circle,
} from "@chakra-ui/react";
import Head from "next/head";

import withHeader from "components/Header";
import { FormEvent, useState } from "react";
import ExchangePage from "components/CreateContent";
import GoBack from "components/GoBack";

function Description() {
  return (
    <FormControl mt="20px" isRequired>
      <FormLabel fontSize="18px" fontWeight="light">
        Description
      </FormLabel>
      <InputGroup size="lg" name="description">
        <InputLeftElement pointerEvents="none" ml="15px" width="fit-content">
          <Text fontWeight="bold">I want</Text>
        </InputLeftElement>
        <Input placeholder="to do/learn something..." paddingLeft="75px" />
      </InputGroup>
    </FormControl>
  );
}

function CreateRequest() {
  const [sliderValue, setSliderValue] = useState(1);
  const [location, setLocation] = useState<null | string>(null);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.target[0].value;
    console.log({ description, location, sliderValue });
  };

  return (
    <Box height="100%">
      <Head>
        <title>Create a Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box mt="40px" ml="85px" width="30vw" flexShrink="0">
        <GoBack />
        <Flex align="center">
          <Heading mt="28px" fontSize="30px">
            Create a Request
          </Heading>
          <Tooltip label="A request is you requesting services using chronos as credit">
            <Circle
              bg="gray.300"
              width="21px"
              height="21px"
              fontSize="sm"
              mt="30px"
              ml="3"
            >
              ?
            </Circle>
          </Tooltip>
        </Flex>
        <ExchangePage
          buttonText="Request!"
          Description={Description}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          submitForm={submitForm}
          location={location}
          setLocation={setLocation}
        />
      </Box>
    </Box>
  );
}

export default withHeader(CreateRequest);
