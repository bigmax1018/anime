export { default } from "./Tabs";

interface Tab {
	label: string;
	element: JSX.Element;
}

export interface TabsProps {
	tabs: Tab[];
	value: number;
	showRefresh?: boolean;
	onRefresh?: () => void;
	onChange: (tab: number) => void;
}

export interface TabPanelProps {
	index: number;
	value: number;
	children?: React.ReactNode;
}
