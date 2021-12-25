import { Box, Flex, Spacer, Square, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Heart } from "react-feather";

import Hg from "./Hourglass";
import User from "./User";
import Location from "./Location";
import {
  ExchangeInfo,
  ExRequest,
  getCardColor,
  getCategoryName,
  TY_IMG_MAP,
} from "lib/exchange";

export const CARD_WIDTH = 341;
export const CARD_HEIGHT = 438;

export default function ExchangeCard({ info }: { info: ExchangeInfo }) {
  return (
    <Flex
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      flexShrink="0"
      flexDirection="column"
      borderWidth={1}
      borderRadius={10}
      borderColor="#BDBDBD"
      overflow="hidden"
    >
      <Square bg={getCardColor(info.type)} flexGrow={1}>
        <Box position="relative" width="90%" height="90%">
          <Image
            src={TY_IMG_MAP[info.type]}
            alt={getCategoryName(info.type)}
            layout="fill"
            sizes={`${CARD_WIDTH * 0.9}px`}
            objectFit="contain"
            quality={90}
            placeholder="blur"
          />
        </Box>
      </Square>
      <CardInfoDisplay info={info} />
    </Flex>
  );
}

function CardInfoDisplay({ info }: { info: ExchangeInfo }) {
  return (
    <Flex p={18} flexDirection="column">
      <Flex alignItems="center" mb="10px">
        <Box fontWeight="bold" fontSize={22} width={215} maxHeight={60}>
          {info.description}
        </Box>
        <Spacer />
        <Flex flexDirection="row" alignItems="center" marginRight="5px">
          <Text fontSize={28} color="#6A6A6A" mr="4px">
            {info.time}
          </Text>
          <Hg width={18} height={21} />
        </Flex>
      </Flex>
      <Flex flexDirection="row" alignItems="center" marginBottom={22}>
        <Text fontSize={18} mr="2px">
          {info.likes}
        </Text>
        <Heart size={18} color="#FF3939" />
      </Flex>
      <Flex>
        <User author={info.author} />
        <Spacer />
        <Box>
          <Location place={info.place} />
        </Box>
      </Flex>
    </Flex>
  );
}

export function ExRequestDisplay({ info }: { info: ExRequest }) {
  return (
    <Box
      width={CARD_WIDTH}
      flexShrink={0}
      borderRadius={10}
      borderWidth={1}
      borderColor="#BDBDBD"
    >
      <CardInfoDisplay info={{ ...info, type: null }} />
    </Box>
  );
}
