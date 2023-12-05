export default class Promisable {
	static asPromise(promise: Promise<unknown>) {
		return new Promise((resolve) =>
			promise.then(
				(res: any) => resolve([res, null]),
				(err: any) => resolve([null, err])
			)
		);
	}
}
