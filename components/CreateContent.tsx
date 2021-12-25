import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { ExchangeType } from "lib/exchange";
import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useMemo,
} from "react";
import Hg from "components/Hourglass";
import { HelpCircle } from "react-feather";

export default function CreateExchange({
  submitForm,
  category,
  toolTip = "recieve",
  Description,
  setCategory,
  location,
  setLocation,
  sliderValue,
  setSliderValue,
  buttonText,
}: {
  sliderValue: number;
  category?: ExchangeType;
  setCategory?: Dispatch<SetStateAction<ExchangeType>>;
  setSliderValue: Dispatch<SetStateAction<number>>;
  setLocation: Dispatch<SetStateAction<string>>;
  location: string;
  toolTip?: string;
  submitForm: FormEventHandler<HTMLFormElement>;
  Description: React.ComponentType<{}>;
  buttonText?: string;
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
    <form onSubmit={submitForm}>
      {<Description />}
      {setCategory !== undefined ? (
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
      ) : null}
      <FormControl isRequired mt="30px">
        <Flex>
          <FormLabel fontSize="18px" fontWeight="light">
            Length
          </FormLabel>
          <Tooltip
            label={`How many chronos you wish to ${toolTip} (1 chronos = 1 hour of service)`}
          >
            <Circle
              bg="gray.300"
              width="21px"
              height="21px"
              fontSize="sm"
              mt="2px"
            >
              ?
            </Circle>
          </Tooltip>
        </Flex>
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
        {buttonText || "Exchange!"}
      </Button>
    </form>
  );
}
