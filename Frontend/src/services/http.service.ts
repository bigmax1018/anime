import axios from "axios";
import AuthService from "./auth.service";
import { log } from "../utils/logger.util";
import { config as configs } from "config";
import ToasterService from "../utils/toaster.util";

const CancelToken = axios.CancelToken;

let source = CancelToken.source();

axios.defaults.baseURL = configs.API_URL;

axios.interceptors.request.use(
	(config: any) => {
		const { url, data, method } = config;

		log(`http ${method} request`, url, "\n", data);

		return { ...config, cancelToken: source.token };
	},
	(error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
	(res: any) => {
		const { config } = res;
		const { url, method } = config;
		const { data, message } = res.data;

		log(`http ${method} response`, url, "\n", data);
		ToasterService.showSuccess(message);

		return res;
	},
	(err: any) => {
		const { config, message: msg, response } = err;
		const message = response?.data?.message;
		const { url, method } = config;

		log(`http ${method} error`, url, message || msg);
		ToasterService.showError(message || msg);

		if (!response) throw err;

		const { code } = response.data;

		if (
			code === 401 &&
			(message === "Unauthorized" ||
				message === "Password has been changed, Login again" ||
				message === "Login session has been expired, Login again")
		) {
			AuthService.logout();
			source.cancel(message);

			setTimeout(() => {
				source = CancelToken.source();

				if (window.location.pathname !== "/") window.location.assign("/");
			}, 300);
		}

		throw err;
	}
);

const http = {
	get: axios.get,
	put: axios.put,
	post: axios.post,
	patch: axios.patch,
	delete: axios.delete,
	setJWT: () => {
		axios.defaults.headers.common["Authorization"] =
			localStorage.getItem("token") || "";
	},
	setMultiPart: () => {
		axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
	},
};

export default http;
