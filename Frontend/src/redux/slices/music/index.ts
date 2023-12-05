export { default, musicActions, musicSlice } from "./musicSlice";

export interface MusicState {
  musics: any[];
  type: string;
  loading: boolean;
}
