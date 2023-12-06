import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IDropzoneProps,
  IFileWithMeta,
  ILayoutProps,
} from "react-dropzone-uploader";
// import { formatBytes, formatDuration } from 'react-dropzone-uploader/dist/utils';
//@ts-ignore
import cancelImg from 'assets/remove.svg'
//@ts-ignore
import removeImg from 'assets/remove.svg'
//@ts-ignore
import restartImg from 'assets/restart.svg'


import UploadIcon from "assets/Upload.png";
import { userActions } from "redux/slices/users";
import { config } from "config";
import ToasterService from "utils/toaster.util";
import GifService from "services/gif.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PictureService from "services/picture.service";
import VideoService from "services/video.service";
import MusicService from "services/music.service";
import { tabActions } from "redux/slices/tab";
import AuthService from "services/auth.service";

const iconByFn = {
  cancel: { backgroundImage: `url(${cancelImg})` },
  remove: { backgroundImage: `url(${removeImg})` },
  restart: { backgroundImage: `url(${restartImg})` },
};
const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div className="dropzone-flex">
      <div {...dropzoneProps} style={{ color: "white !important" }}>
        {previews}
        <div style={{ display: "flex", alignItems: "center" }}>
          {files.length < maxFiles && input}
          {files.length > 0 && submitButton}
        </div>
      </div>
      {/* <div>{files.length > 0 && submitButton}</div> */}
    </div>
  );
};

export default function FileDropZone({ type, uploadType }: any) {
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();
  const { type: gifType } = useAppSelector((state) => state.gif);
  const { type: videoType } = useAppSelector((state) => state.video);
  const { type: musicType } = useAppSelector((state) => state.music);
  const { type: pictureType } = useAppSelector((state) => state.picture);
  const { tab } = useAppSelector((state) => state.tab);

  const getUploadParams = async ({ file }: IFileWithMeta) => {
    const body = new FormData();
    body.append("image", file);
    return { url: `${config.API_URL}/guest/upload`, body };
  };

  const handleChangeStatus = ({ meta }: any, status: any) => {
    if (status === "headers_received") {
      ToasterService.showSuccess(`${meta.name} uploaded`);
    } else if (status === "aborted") {
      ToasterService.showError(`${meta.name} upload failed`);
    }
  };

  const formatBytes = (b: number) => {
    const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let l = 0
    let n = b

    while (n >= 1024) {
      n /= 1024
      l += 1
    }

    return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`
  }

  const formatDuration = (seconds: number) => {
    const date = new Date(0)
    date.setSeconds(seconds)
    const dateString = date.toISOString().slice(11, 19)
    if (seconds < 3600) return dateString.slice(3)
    return dateString
  }


  const handleSubmit: IDropzoneProps["onSubmit"] = async (allFiles) => {
    let arr: any[] = [];
    allFiles.forEach((f) => {
      let payload = {} as any;
      const filename = f.meta.name.split(".").slice(0, -1).join(".");
      payload.name = filename;
      if (uploadType === "gifs") payload.type = gifType;
      if (uploadType === "music") payload.type = musicType;
      if (uploadType === "videos") payload.type = videoType;
      if (uploadType === "pictures") payload.type = pictureType;
      payload.file_type = f.meta.type;
      let xhr = JSON.parse(f?.xhr?.response);
      payload.url = xhr.data.url;
      arr.push({ ...payload });
    });


    if (uploadType === "gifs") GifService.addGif(arr, dispatch);
    if (uploadType === "music") MusicService.addMusic(arr, dispatch);
    if (uploadType === "videos") VideoService.addVideo(arr, dispatch);
    if (uploadType === "pictures") PictureService.addPicture(arr, dispatch);
    if (tab === "user") {
      const result = await AuthService.profilePicture(arr[0], dispatch);

      let tempusers = [];
      if (result[0]) {
        const currentUser = result[0].data.data.user;
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id === currentUser._id) {
            console.log(i)
            tempusers.push({
              ...currentUser,
              friends: currentUser.friends.length === 0 ? [] : currentUser.friends.map((each: any) => { return each._id }),
              partner: currentUser.partner?._id,
            });
          } else {
            tempusers.push(users[i])
          }
        }
        dispatch?.(userActions.setUsers(tempusers));
        console.log(users);
      }

    };

    allFiles.forEach((f) => f.remove());
    if (tab !== "user")
      dispatch(tabActions.setUpload(false));
  };

  const renderPreview = (props: any) => {
    const {
      className,
      imageClassName,
      style,
      imageStyle,
      fileWithMeta: { cancel, remove, restart, file },
      meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError, type },
      isUpload,
      canCancel,
      canRemove,
      canRestart,
      extra: { minSizeBytes },
    } = props;
    console.log(props);

    let title = `${name || '?'}, ${formatBytes(size)}`
    if (duration) title = `${title}, ${formatDuration(duration)}`

    if (status === 'error_file_size' || status === 'error_validation') {
      return (
        <div className={className} style={style}>
          <span className="dzu-previewFileNameError">{title}</span>
          {status === 'error_file_size' && <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>}
          {status === 'error_validation' && <span>{String(validationError)}</span>}
          {canRemove && <span className="dzu-previewButton" style={iconByFn.remove} onClick={remove} />}
        </div>
      )
    }

    if (status === 'error_upload_params' || status === 'exception_upload' || status === 'error_upload') {
      title = `${title} (upload failed)`
    }
    if (status === 'aborted') title = `${title} (cancelled)`

    return (
      <div className={className} style={style}>
        {previewUrl && <img className={imageClassName} style={imageStyle} src={previewUrl} alt={title} title={title} />}
        {!previewUrl && type.startsWith('video/') && (<video width="100" height="100" autoPlay>
          <source src={URL.createObjectURL(file)} type={type} />
          Your browser does not support the video tag.
        </video>)}
        <span className="dzu-previewFileName">{title}</span>
        {/* {!previewUrl && <span className="dzu-previewFileName">{title}</span>} */}

        <div className="dzu-previewStatusContainer">
          {isUpload && (
            <progress max={100} value={status === 'done' || status === 'headers_received' ? 100 : percent} />
          )}

          {status === 'uploading' && canCancel && (
            <span className="dzu-previewButton" style={iconByFn.cancel} onClick={cancel} />
          )}
          {status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove && (
            <span className="dzu-previewButton" style={iconByFn.remove} onClick={remove} />
          )}
          {['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status) &&
            canRestart && <span className="dzu-previewButton" style={iconByFn.restart} onClick={restart} />}
        </div>
      </div>
    )
  };

  return (
    <Dropzone
      LayoutComponent={Layout}
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      submitButtonContent={`Submit ${uploadType}`}
      maxFiles={tab === "user" ? 1 : 30}
      accept={
        uploadType === "videos"
          ? "video/*"
          : uploadType === "music"
            ? "audio/*"
            : uploadType === "gifs"
              ? ".gif"
              : uploadType === "pictures"
                ? ".png, .jpeg, .jpg, .webp, .png, .svg"
                : ""
      }
      PreviewComponent={renderPreview}
      inputContent={
        <div style={{ textAlign: "center" }}>
          {/* <img
            src={UploadIcon}
            alt="Upload"
            style={{
              width: "48px",
              margin: "0",
            }}
          /> */}
          <p
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            {/* Drag and Drop or Browse to */}
            Upload&nbsp;
            {uploadType === "gifs"
              ? gifType
              : uploadType === "pictures"
                ? pictureType
                : uploadType === "music"
                  ? musicType
                  : uploadType === "videos"
                    ? videoType
                    : ""}
            &nbsp;
            {tab === "user" ? "Profile Picture" 
            : uploadType === "gifs"
              ? "Gif"
              : uploadType === "pictures"
                ? "Picture"
                : uploadType === "music"
                  ? "Music"
                  : uploadType === "videos"
                    ? "Video"
                    : ""}
          </p>
        </div>
      }
      styles={{
        dropzone: {
          minHeight: 100,
          maxHeight: 100,
          border: "none",
          borderRadius: 0,
          color: "white",
        },
      }}
    />
  );
}
