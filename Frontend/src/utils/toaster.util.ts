let error: Function, success: Function;

const ToasterService = {
	showError: (message: string) => error?.(message),
	showSuccess: (message: string) => success?.(message),
	subscribe: (successCB: Function, errorCB: Function) => {
		error = errorCB;
		success = successCB;
	},
};

export default ToasterService;
