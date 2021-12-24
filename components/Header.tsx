import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface WithHeaderProps {}
export function Header({}: WithHeaderProps) {
  return (
    <Flex
      maxHeight="73px"
      as="nav"
      bg="white"
      paddingY="9px"
      paddingX="48px"
      borderBottom="1px"
      borderBottomColor="#DADADA"
    >
      <Image src="/logo.png" alt="Exchange" width="112px" height="39px" />
    </Flex>
  );
}

export default function withHeader<P extends object>(
  Component: React.ComponentType<P>
) {
  return class WithHeader extends React.Component<
    P & { header: WithHeaderProps }
  > {
    render() {
      const { header, ...props } = this.props;
      return (
        <Flex flexDirection="column" overflow="none" height="100%">
          <Header {...header} />
          <Box flex="1" overflow="auto">
            <Component {...(props as P)} />
          </Box>
        </Flex>
      );
    }
  };
}
