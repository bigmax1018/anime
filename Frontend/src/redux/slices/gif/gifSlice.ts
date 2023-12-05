import { GifState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GifState = {
  gifs: [],
  publics: [],
  privates: [],
  type: "public",
  loading: true,
};

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    addGif: (state, action) => {
      state.gifs = [...action.payload, ...state.gifs];
    },
    deleteGif: (state, action) => {
      const id = action.payload;
      state.gifs = state.gifs.filter(({ _id }) => _id !== id);
    },
    setGifs: (state, action) => {
      state.gifs = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateGif: (state, action) => {
      const id = action.payload._id;
      state.gifs.every(({ _id }, i) => {
        if (id === _id) {
          state.gifs[i] = action.payload;
          return false;
        }
        return true;
      });
    },
  },
});

const gifReducer = gifSlice.reducer;

export const gifActions = gifSlice.actions;
export default gifReducer;
