export { default, gifActions, gifSlice } from "./gifSlice";

export interface GifState {
  gifs: any[];
  type: string;
  publics: any[];
  privates: any[];
  loading: boolean;
}
