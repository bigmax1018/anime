import ErrorService from "services/error.service";

const InitializationService = {
	init: () => {
		ErrorService.init();
	},
};

export default InitializationService;
