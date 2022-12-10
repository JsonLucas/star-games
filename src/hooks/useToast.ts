import { toast } from "react-toastify"

interface ToastProps{
	message: string,
	type: string | 'success' | 'error'
}

export const useToast = () => {
	const genericToast = (toastProps: ToastProps) => {
		const { type, message } = toastProps;
		if(type === 'success'){
			toast.success(message);
		}else{
			toast.error(message);
		}
	}

	return { genericToast };
}