import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Square,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import GoBack from "components/GoBack";
import withHeader from "components/Header";
import { ExchangeType, TY_IMG_MAP } from "lib/exchange";
import { Dispatch, FormEventHandler, SetStateAction, useMemo } from "react";
import Hg from "components/Hourglass";

export default function CreateExchange({
  submitForm,
  category,
  setCategory,
  location,
  setLocation,
  sliderValue,
  setSliderValue,
}: {
  sliderValue: number;
  category?: ExchangeType;
  setCategory?: Dispatch<SetStateAction<ExchangeType>>;
  setSliderValue: Dispatch<SetStateAction<number>>;
  setLocation: Dispatch<SetStateAction<string>>;
  location: string;
  submitForm: FormEventHandler<HTMLFormElement>;
}) {
  const menuItems = useMemo(
    () =>
      Object.values(ExchangeType)
        .filter((x) => isNaN(parseInt(x as string)))
        .map((type) => {
          const displayType = (type as string).replace("_", " ");
          return (
            <option key={type} value={type}>
              {displayType}
            </option>
          );
        }),
    []
  );

  return (
    <Flex height="100%">
      <Box mt="40px" ml="85px" width="30vw" flexShrink="0">
        <GoBack />
        <Heading mt="28px" fontSize="30px">
          Create an Exchange
        </Heading>
        <form onSubmit={submitForm}>
          <FormControl mt="20px" isRequired>
            <FormLabel fontSize="18px" fontWeight="light">
              Description
            </FormLabel>
            <InputGroup size="lg" name="description">
              <InputLeftElement pointerEvents="none" ml="11px">
                <Text fontWeight="bold">I will </Text>
              </InputLeftElement>
              <Input placeholder="do something awesome..." paddingLeft="60px" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt="30px">
            <FormLabel fontSize="18px" fontWeight="light">
              Category
            </FormLabel>
            <Select
              placeholder="Select Category"
              size="lg"
              value={ExchangeType[category]}
              onChange={(e) => {
                e.preventDefault();
                setCategory(ExchangeType[e.target.value]);
              }}
            >
              {menuItems}
            </Select>
          </FormControl>
          <FormControl isRequired mt="30px">
            <FormLabel fontSize="18px" fontWeight="light">
              Length
            </FormLabel>
            <Flex align="center">
              <Slider
                defaultValue={1}
                min={0.5}
                max={2}
                step={0.25}
                onChange={setSliderValue}
                flexGrow="1"
              >
                <SliderTrack bg="blue.100">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="blue.500" />
                </SliderTrack>
                <SliderThumb boxSize={6} bg="gray.300" />
              </Slider>
              <Text
                width="40px"
                textAlign="right"
                fontWeight="bold"
                ml="10px"
                mr="5px"
                mt="1px"
              >
                {sliderValue}
              </Text>
              <Hg width={14} height={17} />
            </Flex>
          </FormControl>
          <FormControl isRequired mt="30px">
            <FormLabel fontSize="18px" fontWeight="light">
              Location
            </FormLabel>
            <Select
              placeholder="Select Location"
              size="lg"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="r">Remote</option>
              <option value="rp">Remote or In Person</option>
              <option value="p">In Person</option>
            </Select>
            {location && location.indexOf("p") > -1 ? (
              <Input placeholder="City Name" size="lg" mt="10px" />
            ) : null}
          </FormControl>
          <Button
            size="lg"
            type="submit"
            mt="30"
            variant="solid"
            colorScheme={"blue"}
          >
            Exchange!
          </Button>
        </form>
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
  );
}
