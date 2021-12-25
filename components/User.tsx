import { Circle, Flex, Heading, Square, Text } from "@chakra-ui/react";
import { Author } from "lib/exchange";
import NextLink from "next/link";

function getProfileColor(name: string): string {
  const hue =
    name
      .split("")
      .map((x) => x.charCodeAt(0))
      .reduce((a, b) => a + b) % 360;
  const color = `hsl(${hue}, 100%, 84%)`;
  return color;
}

function getInitials(name: string): string {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((name) => name[0])
    .join("")
    .slice(0, 2);
  return initials;
}

export function Profile({
  author,
  size = 28,
}: {
  author: Author;
  size?: number;
}) {
  const color = getProfileColor(author.name);
  const initials = getInitials(author.name);
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

export default function User({
  user,
  size = 28,
}: {
  user: Author;
  size?: number;
}) {
  const fullName = user.name;
  return (
    <NextLink href={`/user/${user.id}`} passHref>
      <Flex flexDirection="row" as="a" align="center">
        <Profile author={user} size={size} />
        <Text ml="6px" mt="-2px" fontWeight="thin" fontSize={size / 2}>
          {fullName}
        </Text>
      </Flex>
    </NextLink>
  );
}

export function ProfileCard({ user }: { user: Author }) {
  const initials = getInitials(user.name);
  return (
    <Flex
      as="a"
      width={454}
      height={585}
      flexShrink="0"
      flexDirection="column"
      borderWidth={1}
      borderRadius={10}
      borderColor="#BDBDBD"
      overflow="hidden"
    >
      {user.pfp ? (
        <Square
          flexGrow={1}
          bgImage={user.pfp.replace("s96-c", "s400-c")}
          bgSize="cover"
        />
      ) : (
        <Square
          bg={getProfileColor(user.name)}
          flexGrow={1}
          fontWeight="bold"
          fontSize="200px"
        >
          {initials}
        </Square>
      )}
      <Heading m="30">{user.name}</Heading>
    </Flex>
  );
}
