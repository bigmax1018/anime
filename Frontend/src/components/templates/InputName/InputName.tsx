import Button from "components/atoms/Button";
import CircleLoader from "components/atoms/CircleLoader";
import Input from "components/atoms/Input";
import { useState } from "react";
import { useAppDispatch } from "redux/hooks";
import GifService from "services/gif.service";
import MusicService from "services/music.service";
import PictureService from "services/picture.service";
import VideoService from "services/video.service";

export default function InputName({ id, name, type }: any) {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeName = async (e: any, id: string) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      id,
      name: e.target[0].value,
    };
    if (type === "gifs") await GifService.updateGif(payload, dispatch);
    if (type === "pictures")
      await PictureService.updatePicture(payload, dispatch);
    if (type === "videos") await VideoService.updateVideo(payload, dispatch);
    if (type === "music") await MusicService.updateMusic(payload, dispatch);
    setValue(!value);
    setLoading(false);
  };

  return (
    <></>
    // <div style={{ marginBottom: "10px", textAlign: "center" }}>
    //   {value ? (
    //     <form
    //       onSubmit={(e) => changeName(e, id)}
    //       style={{ position: "relative" }}
    //     >
    //       {loading && <CircleLoader />}
    //       <Input
    //         fullWidth
    //         type="text"
    //         name="name"
    //         label="Name"
    //         defaultValue={name}
    //         sx={{ marginBottom: "6px" }}
    //       />
    //       <Button variant="text" type="button" onClick={() => setValue(!value)}>
    //         Cancel
    //       </Button>
    //       &nbsp;&nbsp;
    //       <Button variant="text" type="submit">
    //         Save
    //       </Button>
    //     </form>
    //   ) : (
    //     <div style={{ textAlign: "center" }}>
    //       <h3 className="file-name">{name}</h3>
    //       <Button type="button" onClick={() => setValue(!value)}>
    //         Edit
    //       </Button>
    //     </div>
    //   )}
    // </div>
  );
}
