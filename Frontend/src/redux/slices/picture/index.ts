export { default, pictureActions, pictureSlice } from "./pictureSlice";

export interface PictureState {
  pictures: any[];
  type: string;
  publics: any[];
  privates: any[];
  loading: boolean;
}
