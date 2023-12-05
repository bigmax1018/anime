export { default, authActions, authSlice } from "./authSlice";

export interface AuthState {
	user: any;
	chat: any;
	online: any;
	tab: string;
	loading: boolean;
	edit: any
}
