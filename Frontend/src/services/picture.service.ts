import http from "./http.service";
import Promisable from "./promisable.service";
import { AppDispatch } from "redux/store";
import { reset } from "redux-form";
import { pictureActions } from "redux/slices/picture";
import SocketService from "./socket.service";

const PictureService = {
  addPicture: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.post("guest/picture", data)
    );

    if (success) {
      const { picture } = success.data.data;
      SocketService.sendPic(picture);
      // dispatch?.(pictureActions.addPicture(picture));
      dispatch?.(reset("FooterForm"));
    }

    return [success, error];
  },

  deletePicture: async (id: string, dispatch?: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.delete(`guest/picture/${id}`)
    );

    if (success) {
      SocketService.sendDelPic(id);
      // dispatch?.(pictureActions.deletePicture(id));
    }

    return [success, error];
  },

  getPictures: async (dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(pictureActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.get("/guest/pictures")
    );

    if (success) {
      const { pictures } = success.data.data;
      dispatch?.(pictureActions.setPictures(pictures));
    }
    dispatch?.(pictureActions.setLoading(false));

    return [success, error];
  },
  deleteAllPictures: async (data: any, dispatch?: AppDispatch) => {
    http.setJWT();
    dispatch?.(pictureActions.setLoading(true));

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/deleteAllPictures", data)
    );

    if (success) {
      const { pictures } = success.data.data;
      dispatch?.(pictureActions.setPictures(pictures));
    }
    dispatch?.(pictureActions.setLoading(false));

    return [success, error];
  },

  updatePicture: async (data: any, dispatch: AppDispatch) => {
    http.setJWT();

    const [success, error]: any = await Promisable.asPromise(
      http.patch("/guest/picture", data)
    );

    if (success) {
      const { picture } = success.data.data;

      dispatch?.(pictureActions.updatePicture(picture));
    }

    return [success, error];
  },
};

export default PictureService;
