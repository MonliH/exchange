import { Circle, Flex, Text } from "@chakra-ui/react";
import { Author, ExchangeInfo } from "lib/exchange";

export function Profile({
  author,
  size = 28,
}: {
  author: Author;
  size?: number;
}) {
  const initials = `${author[0][0]}${author[1][0]}`;
  const fullName = author.join(" ");
  const hue =
    fullName
      .split("")
      .map((x) => x.charCodeAt(0))
      .reduce((a, b) => a + b) % 360;
  const color = `hsl(${hue}, 100%, 84%)`;
  return (
    <Circle bg={color} w={`${size}px`} h={`${size}px`}>
      <Text
        fontWeight="bold"
        fontSize={`${size / 2 - 3}px`}
        marginTop="-2px"
        userSelect="none"
        cursor="default"
      >
        {initials}
      </Text>
    </Circle>
  );
}

export default function User({ author: author }: { author: Author }) {
  const fullName = author.slice(0, 2).join(" ");
  return (
    <Flex flexDirection="row">
      <Profile author={author} />
      <Text ml="5px" mt="2px" fontWeight="thin">
        {fullName}
      </Text>
    </Flex>
  );
}
