import "react-dropzone-uploader/dist/styles.css";
import Dropzone, { IFileWithMeta, ILayoutProps } from "react-dropzone-uploader";
import { config } from "config";
import ToasterService from "utils/toaster.util";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import AuthService from "services/auth.service";
import ImageService from "services/image.service";

const Layout = ({
  input,
  previews,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div className="dropzone-flex">
      <div {...dropzoneProps}>
        {previews}
        {files.length < maxFiles && input}
      </div>
    </div>
  );
};

export default function MusicDropZone({ musicType }: any) {

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const getUploadParams = async ({ file }: IFileWithMeta) => {
    const body = new FormData();
    body.append("image", file);
    return { url: `${config.API_URL}/guest/upload`, body };
  };

  const handleChangeStatus = ({ meta, remove }: any, status: any) => {
    if (status === "headers_received") {
      let music = `uploads/${meta.name}`;
      if (user) {
        if (musicType === "private") AuthService.music(music, dispatch);
        else ImageService.bgMusic(music, dispatch);
      } else ImageService.bgMusic(music, dispatch);
      remove();
      ToasterService.showSuccess(`${meta.name} uploaded`);
    } else if (status === "aborted") {
      ToasterService.showError(`${meta.name} upload failed`);
    }
  };

  return (
    <Dropzone
      LayoutComponent={Layout}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept={"audio/*"}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent={
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              color: "rgb(255, 255, 255)",
              fontSize: "16px",
              fontWeight: "normal",
              textTransform: "capitalize",
              paddingTop: "2px",
              userSelect: "text",
              overflow: "hidden"
            }}
          >
            Upload Music
          </p>
        </div>
      }
      styles={{
        dropzone: {
          minHeight: 100,
          maxHeight: 100,
          borderRadius: 0,
          overflow: "unset",
          color: "white",
          background: "transparent",
        },
      }}
    />
  );
}
