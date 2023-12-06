import { useAppDispatch, useAppSelector } from "redux/hooks";
import { gifActions } from "redux/slices/gif";
import { musicActions } from "redux/slices/music";
import { pictureActions } from "redux/slices/picture";
import { tabActions } from "redux/slices/tab";
import { videoActions } from "redux/slices/video";
import GifService from "services/gif.service";
import MusicService from "services/music.service";
import PictureService from "services/picture.service";
import VideoService from "services/video.service";

export default function SelectType() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { tab } = useAppSelector((state) => state.tab);
  const { type } = useAppSelector((state) => state.gif);

  const pictureType = useAppSelector((state) => state.picture.type);
  const gifType = useAppSelector((state) => state.gif.type);
  const musicType = useAppSelector((state) => state.music.type);
  const videoType = useAppSelector((state) => state.video.type);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "35px", marginLeft: "-1px" }}>
      <button
        onClick={() => {
          dispatch(gifActions.setType("public"));
          dispatch(pictureActions.setType("public"));
          dispatch(videoActions.setType("public"));
          dispatch(musicActions.setType("public"));
        }}
        style={{
          cursor: "pointer",
          border: 0,
          fontFamily: "'Varela Round', sans-serif",
          fontWeight: type === "public" ? 600 : 500,
          fontSize: "16px",
          background: "none",
          color: "white",
          padding: 0,
          // marginTop: "2px",
          marginBottom: "0.83em",
          userSelect: "text",
          overflow: "hidden",
        }}
      >
        Public
      </button>
      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      <button
        onClick={() => {
          if (user) {
            dispatch(gifActions.setType("private"));
            dispatch(pictureActions.setType("private"));
            dispatch(videoActions.setType("private"));
            dispatch(musicActions.setType("private"));
          }
        }}
        style={{
          cursor: user ? "pointer" : "auto",
          border: 0,
          fontFamily: "'Varela Round', sans-serif",
          fontWeight: type === "private" ? 600 : 500,
          fontSize: "16px",
          background: "none",
          color: "white",
          padding: 0,
          // marginTop: "2px",
          marginBottom: "0.83em",
          userSelect: "text",
          overflow: "hidden",
        }}
      >
        Private
      </button>
      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      <button
        style={{
          cursor: "pointer",
          border: 0,
          fontFamily: "'Varela Round', sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          background: "none",
          color: "white",
          padding: 0,
          // marginTop: "2px",
          marginBottom: "0.83em",
          userSelect: "text",
          overflow: "hidden",
        }}
        onClick={() => {
          dispatch(tabActions.setUpload(true));
        }}
      >
        Upload
      </button>
      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      <button
        style={{
          cursor: "pointer",
          border: 0,
          fontFamily: "'Varela Round', sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          background: "none",
          color: "white",
          padding: 0,
          // marginTop: "2px",
          marginBottom: "0.83em",
          userSelect: "text",
          overflow: "hidden",
        }}
        onClick={() => {

          if (tab === "gifs") {
            const payload = {
              id: gifType == "public" ? null : user._id
            }
            GifService.deleteAllGifs(payload, dispatch);
          }
          if (tab === "pictures") {
            const payload = {
              id: pictureType == "public" ? null : user._id
            }
            PictureService.deleteAllPictures(payload, dispatch);
          }
          if (tab === "videos") {
            const payload = {
              id: videoType == "public" ? null : user._id
            }
            VideoService.deleteAllVideos(payload, dispatch);
          }
          if (tab === "music") {
            const payload = {
              id: musicType == "public" ? null : user._id
            }
            MusicService.deleteAllMusics(payload, dispatch);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
