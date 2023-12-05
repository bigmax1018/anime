export const upper = (value: any) => value && value.toUpperCase();
export const lower = (value: any) => value && value.toLowerCase();

export const lessThan =
	(otherField: string) => (value: any, prev: any, allValues: any) =>
		parseFloat(value) < parseFloat(allValues[otherField]) ? value : prev;

export const greaterThan =
	(otherField: string) => (value: any, prev: any, allValues: any) =>
		parseFloat(value) > parseFloat(allValues[otherField]) ? value : prev;

export const normalizeRegex = (
	value: any,
	prev: any,
	regex: RegExp,
	upper?: boolean
) => {
	if (!value) return value;
	if (upper) value = value.toUpperCase();

	if (regex.test(value)) return value;
	return prev;
};

export const digits = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[0-9]*$/i);
};

export const decimal = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[0-9]{1,}(\.[0-9]{0,2}){0,1}$/);
};

export const pageSize = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[1-9][0-9]{0,2}$/i);
};

export const alphabets = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[A-Z]*$/i, true);
};

export const alphabetsDigits = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[A-Z][A-Z0-9]*$/i, true);
};

export const otpCode = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[0-9]{0,6}$/i);
};

export const couponCode = (value: any, prev: any) => {
	return normalizeRegex(value.trim(), prev, /^[A-Z0-9]{0,5}$/i, true);
};

export const referralCode = (value: any, prev: any) => {
	return normalizeRegex(value, prev, /^[A-Z0-9]{0,6}$/i, true);
};

export const flight = (value: any, prev: any) => {
	if (!value) return value;
	value = value.toUpperCase();

	if (value.length < 3) {
		let regex = /^[A-Z]{0,2}$/;
		if (regex.test(value)) return value;
		return prev;
	}

	let regex = /^[A-Z]{2}\s?[1-9][0-9]{0,9}$/;
	if (regex.test(value)) return value;
	return prev;
};
