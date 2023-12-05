export const number = (value: any) =>
	value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const decimal = (value: any) =>
	value && !/^\d{0,}(\.\d{1,2}){0,1}$/.test(value)
		? "Must be a decimal number"
		: undefined;

export const positive = (value: any) =>
	value && Number(value) < 0 ? "Must be positive" : undefined;

export const greaterThan0 = (value: any) =>
	value && Number(value) === 0 ? "Must be greater than 0" : undefined;

export const digit = (value: any) =>
	value && value.toString().indexOf(".") !== -1
		? "Must be a digit"
		: undefined;

export const required = (value: any) =>
	value || typeof value === "number" ? undefined : "Required";

export const requiredAutoComplete = (value: any) => {
	if (!value?.value) return "Required";
	if (!value?.details) return "Please Select an Option";

	const { city, route, types = [] } = value.details;

	if (!city) return "Address does not contain city!";
	if (!route) return "Address does not contain route!";
	if (types.includes("route"))
		return "Address does not contain street number!";

	return undefined;
};

export const requiredPhone = (value: any) =>
	value?.value || typeof value?.value === "number"
		? undefined
		: "Required";

export const requiredSelect = (value: any) =>
	value && value.length > 0 ? undefined : "Required";

export const validateRemaining = (value: any, allValues: any) => {
	return value &&
		Number(allValues.total_remaining) >= 0 &&
		Number(value) > Number(allValues.total_remaining)
		? "Must be less than equal to Total Remaining"
		: undefined;
};

export const date = (value: any) =>
	value === null || value === undefined || value?.date === ""
		? "Required"
		: value?.error || value?.date === "Invalid Date"
		? "Invalid"
		: undefined;

export const dateRange = (value: any) => {
	return value === null ||
		value === undefined ||
		value.date === "" ||
		value.date[0] === "" ||
		value.date[1] === ""
		? "Required"
		: value.error[0] ||
		  value.error[1] ||
		  value.date[0] === "Invalid Date" ||
		  value.date[1] === "Invalid Date"
		? "Invalid Date"
		: undefined;
};

export const dateRangeFilter = (value: any) => {
	return value &&
		((value.error[0] && !value.error[1]) ||
			(!value.error[0] && value.error[1]) ||
			value.date[0] === "Invalid Date" ||
			value.date[1] === "Invalid Date")
		? "Invalid Date"
		: undefined;
};

export const file = (value: any) =>
	value?.error ? value?.error : undefined;

export const email = (value: any) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? "Invalid email address"
		: undefined;

export const password = (
	value: any,
	allValues: any,
	props: any,
	name: any
) => {
	if (!value) return undefined;

	let value1;

	if (name === "password") value1 = allValues.confirm_password;
	else value1 = allValues.password;

	return value1 && value !== value1
		? `Must be equal to ${
				name === "password" ? "Confirm Password" : "New Password"
		  }`
		: undefined;
};

export const phone = (value: any) => {
	if (!value?.value) return undefined;
	return value?.value?.length >= 7 && value?.value?.length <= 15
		? undefined
		: "Must be in between 7 and 15";
};

export const phoneSimple = (value: any) => {
	if (!value) return undefined;
	return value.length >= 7 && value.length <= 15
		? undefined
		: "Must be in between 7 and 15";
};

export const phoneMUI = (value: any) => {
	return value?.formattedValue?.length === value?.data?.format?.length
		? undefined
		: "Please Enter Complete Phone Number";
};

export const emailOrPhone = (value: any) => {
	if (value && !isNaN(Number(value))) {
		let res = minLength(5)(value);

		if (res) return res;

		return maxLength(15)(value);
	}
	return email(value);
};

export const childrenSeats = (_value: any, values: any) => {
	let sum = 0;

	for (const key in values) {
		if (Object.prototype.hasOwnProperty.call(values, key)) {
			const element = values[key];
			sum += Number(element);
		}
	}

	if (sum === 0) return "Min should be 1";
	if (sum > 2) return "Max should be 2";
	return undefined;
};

const length = (length: number) => (value: any) =>
	value && value.length !== length
		? `Must be ${length} characters`
		: undefined;

const maxLength = (max: number) => (value: any) =>
	value && value.length > max
		? `Must be ${max} characters or less`
		: undefined;

const minLength = (min: number) => (value: any) =>
	value && value.length < min
		? `Must be ${min} characters or more`
		: undefined;

export const length4 = length(4);
export const length5 = length(5);
export const length6 = length(6);
export const minLength3 = minLength(3);
export const minLength5 = minLength(5);
export const minLength6 = minLength(6);
export const maxLength8 = maxLength(8);
export const maxLength15 = maxLength(15);
