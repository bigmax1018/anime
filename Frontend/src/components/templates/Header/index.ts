import { SelectOption } from "components/atoms/Select";
export { default } from "./Header";

export interface ILink {
  to: string;
  text: string;
  active: string;
  options?: SelectOption[];
}
