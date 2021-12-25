import {
  FormControl,
  FormLabel,
  InputGroup,
  Text,
  InputLeftElement,
  Input,
  Box,
  Flex,
  Heading,
  Square,
  Tooltip,
  Circle,
} from "@chakra-ui/react";
import Head from "next/head";

import withHeader from "components/Header";
import { ExchangeType, TY_IMG_MAP } from "lib/exchange";
import { FormEvent, useState } from "react";
import ExchangePage from "components/CreateContent";
import GoBack from "components/GoBack";
import Image from "next/image";
import withAuth from "lib/auth";
import withNoSsr from "components/NoSsr";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function Description() {
  return (
    <FormControl mt="20px" isRequired>
      <FormLabel fontSize="18px" fontWeight="light">
        Description
      </FormLabel>
      <InputGroup size="lg" name="description">
        <InputLeftElement pointerEvents="none" ml="15px" width="fit-content">
          <Text fontWeight="bold">I will</Text>
        </InputLeftElement>
        <Input placeholder="do something awesome" paddingLeft="61px" />
      </InputGroup>
    </FormControl>
  );
}

function CreateExchange() {
  const [sliderValue, setSliderValue] = useState(1);
  const [location, setLocation] = useState<null | string>(null);
  const [category, setCategory] = useState<undefined | ExchangeType>(undefined);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.target[0].value;
    let l: null | string = null;
    if (location.indexOf("p") > -1) {
      l = (e.target as any).elements.location.value as string;
    }
    const newDoc = {
      description,
      location: l,
      type: category,
      time: sliderValue,
      remote: location.indexOf("r") > -1,
      likes: 0,
      authorUid: getAuth().currentUser.uid,
    };
    console.log(newDoc);
    (async () => {
      const exchanges = collection(getFirestore(), "exchanges");
      await addDoc(exchanges, newDoc);
      toast.success("Added new exchange.", {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })();
  };

  return (
    <Box height="100%">
      <Head>
        <title>Create an Exchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height="100%">
        <Box mt="40px" ml="85px" width="30vw" flexShrink="0">
          <GoBack />
          <Flex align="center">
            <Heading mt="28px" fontSize="30px">
              Create an Exchange
            </Heading>

            <Tooltip label="An exchange is you offering your services in exchange for chronos">
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
            Description={Description}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            submitForm={submitForm}
            location={location}
            setLocation={setLocation}
            category={category}
            setCategory={setCategory}
          />
        </Box>
        <Box
          height="100%"
          width="100%"
          position="relative"
          flexGrow="1"
          overflow="hidden"
        >
          <Square
            position="absolute"
            height="100%"
            width="65%"
            bg="blue.200"
            transform="skewX(-10deg) "
            right="-10%"
          />
          {category !== undefined ? (
            <Flex align="center" justify="center" width="100%" height="100%">
              <Box width="70vh" height="70vh" position="relative">
                <Image
                  src={TY_IMG_MAP[category]}
                  alt="Category Image"
                  sizes="70vh"
                  layout="fill"
                  objectFit="contain"
                  quality={80}
                />
              </Box>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
}

export default withNoSsr(withHeader(withAuth({}, CreateExchange)));
