import { Box, Flex, IconButton, Square } from "@chakra-ui/react";
import { ChevronRight, ChevronLeft } from "react-feather";

import ExchangeCard, { CARD_WIDTH } from "components/Exchange";
import { ExchangeInfo } from "lib/exchange";
import { useSpring, animated } from "react-spring";
import React, { MouseEventHandler } from "react";
import { clamp } from "lib/util";
import useWindowSize from "lib/useWindowSize";

const CARD_GAP = 48;
const SLIDE_OFFSET = CARD_GAP + CARD_WIDTH;

export default function Exchanges<T>({
  cards,
  padding,
  Component,
}: {
  cards: (T & { key: string })[];
  padding: number;
  Component: React.ComponentType<{ info: T }>;
}) {
  const [styles, api] = useSpring(() => ({
    x: 0,
  }));
  const { width } = useWindowSize();
  const lowBound =
    -SLIDE_OFFSET *
    (cards.length - Math.floor((width - padding) / SLIDE_OFFSET));
  const highBound = 0;

  const nextSlide = (process: (x: number, y: number) => number) => () => {
    api.start({
      x: clamp(process(styles.x.get(), SLIDE_OFFSET), lowBound, highBound),
    });
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      paddingLeft={1}
      _after={{
        content: '""',
        height: "100%",
        width: "10%",
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        position: "absolute",
        background:
          "linear-gradient(270deg, #FFFFFF 32.81%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      <animated.div
        style={{
          transform: styles.x.to((v) => `translate3d(${v}px, 0 , 0)`),
        }}
      >
        <Flex flexDirection="row" sx={{ gap: `${CARD_GAP}px` }}>
          {cards.map((card) => (
            <Component info={card} key={card.key} />
          ))}
        </Flex>
      </animated.div>
      {lowBound >= 0 ? null : (
        <Box position="absolute" top="50%" right="6%" zIndex={2}>
          <IconButton
            position="relative"
            bg="gray.200"
            top="-50%"
            aria-label="Next"
            borderRadius="50%"
            right="-50%"
            width="48px"
            height="48px"
            borderColor="#EFEFEF"
            borderWidth="1px"
            icon={<ChevronRight size={40} strokeWidth={1.5} />}
            onClick={nextSlide((a, b) => a - b)}
          />
        </Box>
      )}
      <animated.div
        style={{
          opacity: styles.x.to((x) =>
            x === 0 ? 0 : x > -SLIDE_OFFSET ? x / -SLIDE_OFFSET : 1
          ),
        }}
      >
        <Box position="absolute" top="50%" left="32px" zIndex={10}>
          <IconButton
            position="relative"
            bg="gray.200"
            top="-50%"
            aria-label="Next"
            borderRadius="50%"
            left="-50%"
            width="48px"
            height="48px"
            borderColor="#EFEFEF"
            borderWidth="1px"
            icon={<ChevronLeft size={40} strokeWidth={1.5} />}
            onClick={nextSlide((a, b) => a + b)}
          />
        </Box>
      </animated.div>
    </Box>
  );
}
