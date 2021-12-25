import { Flex, Heading } from "@chakra-ui/react";
import { Author } from "lib/exchange";
import { Profile } from "./User";
import NextLink from "next/link";

export function ProfileCard(author: Author) {
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
      <Profile author={author} size={500} />
    </Flex>
  );
}
