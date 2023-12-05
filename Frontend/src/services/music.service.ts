import http from "./http.service";
import Promisable from "./promisable.service";
import { AppDispatch } from "redux/store";
import { reset } from "redux-form";
import { musicActions } from "redux/slices/music";
import SocketService from "./socket.service";

const MusicService = {
  addMusic: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.post("guest/music", data)
    );

    if (success) {
      const { music } = success.data.data;

      SocketService.sendMusicTab(music);
      // dispatch?.(musicActions.addMusic(music));
      dispatch?.(reset("FooterForm"));
    }

    return [success, error];
  },

  deleteMusic: async (id: string, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.delete(`guest/music/${id}`)
    );

    if (success) {
      SocketService.sendDelMusic(id);
      // dispatch?.(musicActions.deleteMusic(id));
    }

    return [success, error];
  },

  getMusics: async (dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(musicActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/musics")
    );

    if (success) {
      const { musics } = success.data.data;
      dispatch?.(musicActions.setMusics(musics));
    }
    dispatch?.(musicActions.setLoading(false));

    return [success, error];
  },
  deleteAllMusics: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(musicActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/deleteAllMusics", data)
    );

    if (success) {
      const { musics } = success.data.data;
      dispatch?.(musicActions.setMusics(musics));
    }
    dispatch?.(musicActions.setLoading(false));

    return [success, error];
  },

  updateMusic: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/music", data)
    );

    if (success) {
      const { music } = success.data.data;

      dispatch?.(musicActions.updateMusic(music));
    }

    return [success, error];
  },
};

export default MusicService;
