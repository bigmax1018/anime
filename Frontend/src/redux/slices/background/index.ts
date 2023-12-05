export { default, backgroundActions, backgroundSlice } from "./backgroundSlice";

export interface BackgroundState {
  background: string;
  property: string;
  music: any;
  play: boolean;
  video: any;
  upload: boolean;
  outfit: any;
  anime: boolean;
  bgType: string;
}
