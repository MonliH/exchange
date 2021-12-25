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
import withAuth from "lib/auth";
import withNoSsr from "components/NoSsr";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.target[0].value;
    let l: null | string = null;
    if (location.indexOf("p") > -1) {
      l = (e.target as any).elements.location.value as string;
    }
    const newDoc = {
      description: "I want " + description,
      location: l,
      time: sliderValue,
      remote: location.indexOf("r") > -1,
      likes: 0,
      authorUid: getAuth().currentUser.uid,
    };
    (async () => {
      const requests = collection(getFirestore(), "requests");
      await addDoc(requests, newDoc);
      toast.success("Added new request.", {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.replace("/");
    })();
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
          toolTip="give"
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

export default withNoSsr(withHeader(withAuth(CreateRequest)));
