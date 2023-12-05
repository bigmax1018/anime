import { LightgalleryItem } from "react-lightgallery";

export default function PhotoGallery({ image, group }: any) {
  return (
    <div  style={{ width: group == "profile" ? "50%" : "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LightgalleryItem src={image} group={group}>
        <img src={image} style={{ width: group == "profile" ? "auto" : "100%", maxHeight: group == "profile" ? "calc(100vh - 320px)" : "auto" }} alt={image} />
      </LightgalleryItem>
    </div>
  );
}
