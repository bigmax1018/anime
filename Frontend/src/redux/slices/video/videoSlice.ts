import LocalStorage from "utils/localstorage.service";
import { VideoState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VideoState = {
  videos: [],
  publics: [],
  privates: [],
  type: "public",
  loading: true,
};

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videos = [...action.payload, ...state.videos];
      state.type === "private"
        ? state.privates.unshift({
            url: `${process.env.REACT_APP_FILE_URL}/${action.payload.url}`,
            type: "video",
            title: action.payload.name,
          })
        : state.publics.unshift({
            url: `${process.env.REACT_APP_FILE_URL}/${action.payload.url}`,
            type: "video",
            title: action.payload.name,
          });
    },
    deleteVideo: (state, action) => {
      const id = action.payload.video._id;
      state.videos = state.videos.filter(({ _id }) => _id !== id);

      const indexOfObject = state.videos.findIndex((object) => {
        return object.url === action.payload.url;
      });

      state.type === "private"
        ? state.privates.splice(indexOfObject, 1)
        : state.publics.splice(indexOfObject, 1);
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
      let user = LocalStorage.getItem("user");
      action.payload.forEach((img: any) => {
        let data = {
          url: `${process.env.REACT_APP_FILE_URL}/${img.url}`,
          type: "video",
          title: img.name,
        };
        img.type === "private"
          ? user._id === img.user_id && state.privates.push(data)
          : state.publics.push(data);
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateVideo: (state, action) => {
      const id = action.payload._id;
      state.videos.every(({ _id }, i) => {
        if (id === _id) {
          state.videos[i] = action.payload;
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

const videoReducer = videoSlice.reducer;

export const videoActions = videoSlice.actions;
export default videoReducer;
