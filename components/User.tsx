import { Circle, Flex, Text } from "@chakra-ui/react";
import { Author } from "lib/exchange";
import NextLink from "next/link";

export function Profile({
  author,
  size = 28,
}: {
  author: Author;
  size?: number;
}) {
  const nameParts = author.name.split(" ");
  const initials = nameParts
    .map((name) => name[0])
    .join("")
    .slice(0, 2);
  const hue =
    author.name
      .split("")
      .map((x) => x.charCodeAt(0))
      .reduce((a, b) => a + b) % 360;
  const color = `hsl(${hue}, 100%, 84%)`;
  return author.pfp ? (
    <Circle
      bg={color}
      w={`${size}px`}
      h={`${size}px`}
      bgImage={author.pfp}
      bgSize="cover"
    />
  ) : (
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
  const fullName = author.name;
  return (
    <NextLink href={`/user/${author.id}`} passHref>
      <Flex flexDirection="row" as="a">
        <Profile author={author} />
        <Text ml="5px" mt="2px" fontWeight="thin">
          {fullName}
        </Text>
      </Flex>
    </NextLink>
  );
}
