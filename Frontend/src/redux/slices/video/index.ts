export { default, videoActions, videoSlice } from "./videoSlice";

export interface VideoState {
  videos: any[];
  type: string;
  publics: any[];
  privates: any[];
  loading: boolean;
}
