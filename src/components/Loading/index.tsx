import { Box } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <Box
      position="absolute"
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ThreeDots height={40} width={40} color="red" />
    </Box>
  );
}
