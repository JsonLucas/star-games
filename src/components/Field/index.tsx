import { InputField } from "./style";
import { Input } from '@chakra-ui/react';

interface props{
	register: any,
	name: string,
	placeholder: string,
	type: string,
	disabled: boolean,
	required?: boolean,
	value?: string
}

export function Field({ register, name, placeholder, type, disabled, required, value }: props){
	return (
		<Input p='8px' w='90%' border='none' borderRadius='5px' _focus={{ outline: 0 }}
		{...register(name)} placeholder={placeholder} type={type} disabled={disabled} required={required} />
	);
}