import { ChevronLeft } from "react-feather";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

/**
 * Component to go back to the previous page
 */
export default function GoBack() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.replace("/")}>
      <Flex>
        <ChevronLeft size={24} color="#838383" />
        <span color="#444444">Go Back</span>
      </Flex>
    </button>
  );
}
