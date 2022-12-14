import { Box } from "@chakra-ui/react";
import { IParentComponentForm } from "../../types/componentProps";

export function RowField({children, fieldType}: IParentComponentForm) {
	return (
		<Box borderRadius='5px' display='flex' justifyContent='space-between' alignItems='center' w='95%' m='auto'>
			{children}
		</Box>
	);
}