let func: () => void = () => {};

const SubscriptionService = {
	call: () => func(),
	unsubscribe: () => (func = () => {}),
	subscribe: (fn: () => void) => (func = fn),
};

export default SubscriptionService;
