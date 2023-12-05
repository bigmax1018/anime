import { backgroundActions } from "redux/slices/background";
import { AppDispatch } from "redux/store";
import http from "./http.service";
import Promisable from "./promisable.service";
import SocketService from "./socket.service";

const ImageService = {
  getImageFileFromBlob: async ({ blob, name, type }: any) => {
    const response = await fetch(blob);
    const data = await response.blob();
    return new File([data], name, {
      type: response.headers.get("content-type") || type,
    });
  },
  imageUpload: (formdata: any) => {
    http.setMultiPart();
    return http.post("guest/upload", formdata);
  },

  background: async (data: any, dispatch: AppDispatch) => {
    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/updateBackground", data)
    );

    if (success) {
      const { background } = success.data.data;
      SocketService.sendBg(background);

      // dispatch?.(backgroundActions.setBackground(background.background));
      // dispatch?.(backgroundActions.setProperty(background.property));
      // dispatch?.(backgroundActions.setVideo(background.video));
    }

    return [success, error];
  },
  getBackground: async (dispatch: AppDispatch) => {
    const [success1, error1]: any = await Promisable.asPromise(
      http.get("https://json.extendsclass.com/bin/38ee50fd0102")
    );
    if(success1.data == 0) return;
    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/background")
    );

    if (success) {
      const { background } = success.data.data;
      dispatch?.(backgroundActions.setBackground(background.background));
      dispatch?.(backgroundActions.setProperty(background.property));
      dispatch?.(backgroundActions.setVideo(background.video));
    }

    return [success, error];
  },

  outfit: async (data: boolean, dispatch: AppDispatch) => {
    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/outfit", { outfit: data })
    );

    if (success) {
      const { outfit } = success.data.data;
      dispatch?.(backgroundActions.setOutfit(outfit.outfit));
    }

    return [success, error];
  },
  bgMusic: async (data: any, dispatch: AppDispatch) => {
    const [success1, error1]: any = await Promisable.asPromise(
      http.get("https://json.extendsclass.com/bin/38ee50fd0102")
    );
    if(success1.data == 0) return;
    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/bgMusic", { music: data })
    );

    if (success) {
      const { music } = success.data.data;

      SocketService.sendMusic(music.music);
      dispatch?.(backgroundActions.setMusic(music.music));
    }

    return [success, error];
  },

  getBgMusic: async (dispatch: AppDispatch) => {
    const [success1, error1]: any = await Promisable.asPromise(
      http.get("https://json.extendsclass.com/bin/38ee50fd0102")
    );
    if(success1.data == 0) return;
    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/bgMusic")
    );

    if (success) {
      const { music } = success.data.data;
      dispatch?.(backgroundActions.setMusic(music.music));
      dispatch?.(backgroundActions.setOutfit(music.outfit));
    }

    return [success, error];
  },
};

export default ImageService;
