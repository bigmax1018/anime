// import { log } from "utils/logger.util";
// import ToasterService from "utils/toaster.util";

const ErrorService = {
	init: () => {
		window.addEventListener("error", (e: any) => {
			// log(e.message);
			// ToasterService.showError(e.message);
		});

		window.addEventListener("unhandledrejection", (e: any) => {
			// log(e.message);
			// ToasterService.showError(e.message);
		});
	},
};

export default ErrorService;
