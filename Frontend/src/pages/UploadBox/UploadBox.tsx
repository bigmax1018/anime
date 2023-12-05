import FileDropZone from "components/atoms/FileDropZone";
import { useAppSelector } from "redux/hooks";

export default function UploadBox() {
  const tab = useAppSelector((state) => state.tab.tab);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  return (
    <div className="upload-box" style={{ width: tab === "user" ? "100%" : "100%", marginLeft: "1px" }}>
      <FileDropZone uploadType={tab} />
    </div>
  );
}
