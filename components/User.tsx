import { Circle, Flex, Heading, Square, Text } from "@chakra-ui/react";
import { User } from "lib/exchange";
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
  author: User;
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

export default function UserView({
  user,
  size = 28,
}: {
  user: User;
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

export function LargeProfileImage({
  user,
  fontSize,
  styles = {},
}: {
  user: User;
  fontSize: number;
  styles?: object;
}) {
  const initials = getInitials(user.name);
  return user.pfp ? (
    <Square
      flexGrow={1}
      bgImage={user.pfp.replace("s96-c", "s400-c")}
      bgSize="cover"
      width="100%"
      {...styles}
    />
  ) : (
    <Square
      bg={getProfileColor(user.name)}
      flexGrow={1}
      fontWeight="bold"
      fontSize={`${fontSize}px`}
      width="100%"
      {...styles}
    >
      {initials}
    </Square>
  );
}

export function ProfileCard({ user }: { user: User }) {
  return (
    <Flex
      width={454}
      height={585}
      borderWidth={1}
      borderRadius={10}
      borderColor="#BDBDBD"
      overflow="hidden"
      flexShrink="0"
      flexDirection="column"
    >
      <LargeProfileImage fontSize={200} user={user} />
      <Heading m="30" flexShrink={0}>
        {user.name}
      </Heading>
    </Flex>
  );
}
