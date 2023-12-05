import { BackgroundState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BackgroundState = {
  background: "",
  property: "",
  music: null,
  play: true,
  video: null,
  upload: false,
  outfit: null,
  anime: false,
  bgType: "public",
};

export const backgroundSlice = createSlice({
  name: "backgrounds",
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
    setProperty: (state, action: PayloadAction<string>) => {
      state.property = action.payload;
    },
    setMusic: (state, action: PayloadAction<string>) => {
      state.music = action.payload;
    },
    setVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    setUpload: (state, action: PayloadAction<boolean>) => {
      state.upload = action.payload;
    },
    setOutfit: (state, action: PayloadAction<string>) => {
      state.outfit = action.payload;
    },
    setAnime: (state, action: PayloadAction<boolean>) => {
      state.anime = action.payload;
    },
    setPlay: (state, action: PayloadAction<boolean>) => {
      console.log("Slice", action.payload);

      state.play = action.payload;
    },
    setBgType: (state, action: PayloadAction<string>) => {
      state.bgType = action.payload;
    },
  },
});

const backgroundReducer = backgroundSlice.reducer;

export const backgroundActions = backgroundSlice.actions;
export default backgroundReducer;
