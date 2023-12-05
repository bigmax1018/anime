import { MusicState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MusicState = {
  musics: [],
  type: "public",
  loading: true,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    addMusic: (state, action) => {
      state.musics = [...action.payload, ...state.musics];
    },
    deleteMusic: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.musics = state.musics.filter(({ _id }) => _id !== id);
    },
    setMusics: (state, action) => {
      state.musics = action.payload;
    },
    deleteAllMusics: (state, action) => {
      state.musics = action.payload;
    },
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
    updateMusic: (state, action) => {
      const id = action.payload._id;
      state.musics.every(({ _id }, i) => {
        if (id === _id) {
          state.musics[i] = action.payload;
          return false;
        }
        return true;
      });
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

const musicReducer = musicSlice.reducer;

export const musicActions = musicSlice.actions;
export default musicReducer;
