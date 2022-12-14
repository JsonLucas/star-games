import { Box } from "@chakra-ui/react";
import { IParentComponentForm } from "../../types/componentProps";

export function ContainerCardForm({ children }: IParentComponentForm) {
	return (
		<Box position="absolute"
		w="100%"
		h="100%"
		display="flex"
		justifyContent="center"
		alignItems="center">
			{children}
		</Box>
	);
}