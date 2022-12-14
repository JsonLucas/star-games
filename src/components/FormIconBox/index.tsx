import { Text } from "@chakra-ui/react";
import { IParentComponentForm } from "../../types/componentProps";

export function FormIconBox({ children }: IParentComponentForm) {
  return (
    <Text
      p="1px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="auto"
      fontWeight="bold"
      fontSize="20px"
    >
      {children}
    </Text>
  );
}
