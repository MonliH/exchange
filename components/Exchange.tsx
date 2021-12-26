import {
  Box,
  Circle,
  Flex,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  Square,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Heart } from "react-feather";

import Hg from "./Hourglass";
import User, { LargeProfileImage } from "./User";
import Location from "./Location";
import {
  ExchangeInfo,
  ExRequest,
  getCardColor,
  getCategoryName,
  TY_IMG_MAP,
} from "lib/exchange";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { sendMessage } from "lib/chat";
import { getAuth } from "firebase/auth";
import { useAuth } from "lib/auth";

export const CARD_WIDTH = 341;
export const CARD_HEIGHT = 438;

export default function ExchangeCard({ info }: { info: ExchangeInfo }) {
  const router = useRouter();
  const { authUser } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authUser) {
      sendMessage(
        e.target.elements.message.value,
        getAuth().currentUser.uid,
        info.author.id,
        () => {}
      );
      router.replace(`/chat/${info.author.id}`);
    } else {
      setError("Please sign in before chatting.");
    }
  };
  const inputRef = useRef<HTMLInputElement>();
  return (
    <Popover
      placement="right"
      initialFocusRef={inputRef}
      isLazy
      onClose={() => setError(null)}
    >
      <PopoverTrigger>
        <Flex
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          flexShrink="0"
          flexDirection="column"
          borderWidth={1}
          borderRadius={10}
          borderColor="#BDBDBD"
          overflow="hidden"
          cursor="pointer"
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
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="250px">
          <PopoverArrow />
          <PopoverHeader>Ask about this exchange</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody p="0" width="100%">
            <Flex align="center" direction="column">
              <Circle width={100} height={100} overflow="hidden" my="10px">
                <LargeProfileImage
                  user={info.author}
                  fontSize={42}
                  styles={{ height: "100%" }}
                />
              </Circle>
              <Heading p="2" fontSize="2xl">
                {info.author.name}
              </Heading>
            </Flex>
          </PopoverBody>
          <PopoverFooter>
            <form onSubmit={onSubmit}>
              <Input
                ref={inputRef}
                placeholder={`Message @${info.author.name}`}
                name="message"
              />
            </form>
            {error && <Text color="red">{error}</Text>}
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
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
        <User user={info.author} />
        <Spacer />
        <Box>
          <Location place={info.place} />
        </Box>
      </Flex>
    </Flex>
  );
}

export function ExRequestDisplay({ info }: { info: ExRequest }) {
  const router = useRouter();
  const { authUser } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authUser) {
      sendMessage(
        e.target.elements.message.value,
        getAuth().currentUser.uid,
        info.author.id,
        () => {}
      );
      router.replace(`/chat/${info.author.id}`);
    } else {
      setError("Please sign in before chatting.");
    }
  };
  const inputRef = useRef<HTMLInputElement>();
  return (
    <Popover
      placement="right"
      initialFocusRef={inputRef}
      isLazy
      onClose={() => setError(null)}
    >
      <PopoverTrigger>
        <Box
          width={CARD_WIDTH}
          flexShrink={0}
          borderRadius={10}
          borderWidth={1}
          borderColor="#BDBDBD"
        >
          <CardInfoDisplay info={{ ...info, type: null }} />
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="250px">
          <PopoverArrow />
          <PopoverHeader>Ask about this exchange</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody p="0" width="100%">
            <Flex align="center" direction="column">
              <Circle width={100} height={100} overflow="hidden" my="10px">
                <LargeProfileImage
                  user={info.author}
                  fontSize={42}
                  styles={{ height: "100%" }}
                />
              </Circle>
              <Heading p="2" fontSize="2xl">
                {info.author.name}
              </Heading>
            </Flex>
          </PopoverBody>
          <PopoverFooter>
            <form onSubmit={onSubmit}>
              <Input
                ref={inputRef}
                placeholder={`Message @${info.author.name}`}
                name="message"
              />
            </form>
            {error && <Text color="red">{error}</Text>}
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
