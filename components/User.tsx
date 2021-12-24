import { Circle, Flex, Text } from "@chakra-ui/react";
import { CardInfo } from "lib/card";

export function Profile({ name }: { name: CardInfo["author"] }) {
  const initials = `${name[0][0]}${name[1][0]}`;
  const fullName = name.join(" ");
  const hue =
    fullName
      .split("")
      .map((x) => x.charCodeAt(0))
      .reduce((a, b) => a + b) % 360;
  const color = `hsl(${hue}, 100%, 84%)`;
  return (
    <Circle bg={color} w="28px" h="28px">
      <Text
        fontWeight="bold"
        fontSize="11px"
        marginTop="-2px"
        userSelect="none"
        cursor="default"
      >
        {initials}
      </Text>
    </Circle>
  );
}

export default function User({ name }: { name: CardInfo["author"] }) {
  const fullName = name.join(" ");
  return (
    <Flex flexDirection="row">
      <Profile name={name} />
      <Text ml="5px" mt="2px" fontWeight="thin">
        {fullName}
      </Text>
    </Flex>
  );
}
