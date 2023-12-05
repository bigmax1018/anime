import { change } from "redux-form";
import { AppDispatch } from "redux/store";

const LocalStorage = {
	getItem: (key: string) => {
		let value: any = localStorage.getItem(key) || "";

		if (value === "undefined") value = "";
		return value ? JSON.parse(value) : value;
	},

	setItem: (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	},

	setFormValues: (form: string, dispatch: AppDispatch) => {
		let values: any = localStorage.getItem(form) || "";

		if (!values) return;

		values = JSON.parse(values);

		for (const key in values) {
			if (Object.prototype.hasOwnProperty.call(values, key)) {
				const element = values[key];
				dispatch(change(form, key, element));
			}
		}
	},
};

export default LocalStorage;
