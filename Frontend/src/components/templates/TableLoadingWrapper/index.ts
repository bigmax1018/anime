export { default } from "./TableLoadingWrapper";

export interface TableLoadingWrapperProps {
	length: number;
	loading: boolean;
	rows?: number;
	message?: string;
	coloumns?: number;
	container?: boolean;
	children: React.ReactNode;
}
