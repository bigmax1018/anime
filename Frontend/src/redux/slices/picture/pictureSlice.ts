import { PictureState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PictureState = {
  pictures: [],
  publics: [],
  privates: [],
  type: "public",
  loading: true,
};

export const pictureSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {
    addPicture: (state, action) => {
      state.pictures = [...action.payload, ...state.pictures];
    },
    deletePicture: (state, action) => {
      const id = action.payload;
      state.pictures = state.pictures.filter(({ _id }) => _id !== id);
    },
    setPictures: (state, action) => {
      state.pictures = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    updatePicture: (state, action) => {
      const id = action.payload._id;
      state.pictures.every(({ _id }, i) => {
        if (id === _id) {
          state.pictures[i] = action.payload;
          return false;
        }
        return true;
      });
    },
  },
});

const pictureReducer = pictureSlice.reducer;

export const pictureActions = pictureSlice.actions;
export default pictureReducer;
