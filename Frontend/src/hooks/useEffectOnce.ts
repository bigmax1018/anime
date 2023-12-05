import { useEffect, useRef } from "react";

export default function useEffectOnce(callback: () => void) {
	const once = useRef(false);

	useEffect(() => {
		if (once.current) return;

		callback();

		once.current = true;
	}, [callback]);
}
