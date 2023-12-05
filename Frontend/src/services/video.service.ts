import http from "./http.service";
import Promisable from "./promisable.service";
import { AppDispatch } from "redux/store";
import { reset } from "redux-form";
import { videoActions } from "redux/slices/video";
import SocketService from "./socket.service";

const VideoService = {
  addVideo: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.post("guest/video", data)
    );

    if (success) {
      const { video } = success.data.data;
      // dispatch?.(videoActions.addVideo(video));
      SocketService.sendVideo(video);
      dispatch?.(reset("FooterForm"));
    }

    return [success, error];
  },

  deleteVideo: async (id: string, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.delete(`guest/video/${id}`)
    );

    if (success) {
      SocketService.sendDelVideo(success.data.data);
      dispatch?.(videoActions.deleteVideo(success.data.data));
    }

    return [success, error];
  },

  getVideos: async (dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(videoActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/videos")
    );

    if (success) {
      const { videos } = success.data.data;
      dispatch?.(videoActions.setVideos(videos));
    }
    dispatch?.(videoActions.setLoading(false));

    return [success, error];
  },

  deleteAllVideos: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(videoActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/deleteAllVideos", data)
    );

    if (success) {
      const { videos } = success.data.data;
      dispatch?.(videoActions.setVideos(videos));
    }
    dispatch?.(videoActions.setLoading(false));

    return [success, error];
  },


  updateVideo: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/video", data)
    );

    if (success) {
      const { video } = success.data.data;

      dispatch?.(videoActions.updateVideo(video));
    }

    return [success, error];
  },
};

export default VideoService;
