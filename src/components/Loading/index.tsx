import { Box, Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner thickness="5px" color="grey" size='md' />
    </Flex>
  );
}
