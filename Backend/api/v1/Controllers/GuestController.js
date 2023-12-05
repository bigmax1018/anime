const tryCatchAsync = require("../../../util/tryCatchAsync");
const apiResponse = require("../../../util/apiResponse");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Models/Users");
const Gifs = require("../Models/Gifs");
const Videos = require("../Models/Videos");
const Musics = require("../Models/Music");
const Pictures = require("../Models/Pictures");
const AppError = require("../../../util/appError");
const Background = require("../Models/Background");
const BackgroundMusic = require("../Models/BackgroundMusic");
const PublicChat = require("../Models/PublicChat");
const { success, created, notFound } =
  require("../../../util/statusCode").statusCode;

exports.addSocketUser = tryCatchAsync(async (req, res) => {
  const { id, name } = req.body;

  const data = await User.create({
    name,
    role: "user",
    socketId: id,
    race: "human",
  });

  let response_data = { user: data };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.getUser = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  let user = await User.findOne(query)
    .select("-password")
    .populate("friends")
    .populate("partner")
    .select("-password");

  if (!user) throw new AppError("Not found", notFound);
  user.password = "";
  let response_data = { user };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.getAllUsers = tryCatchAsync(async (req, res) => {
  const users = await User.find().select("-password");

  let response_data = { users };
  return apiResponse.successResponse(res, response_data, "", success);
});

//Gifs Controller

exports.getAllGifs = tryCatchAsync(async (req, res) => {
  const gifs = await Gifs.find().sort({
    createdAt: -1,
  });

  let response_data = { gifs };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.deleteAllGifs = tryCatchAsync(async (req, res) => {
  const { id } = req.body;
  if (id == null) {
    await Gifs.deleteMany({ type: "public" });
  } else {
    await Gifs.deleteMany({ type: "private", user_id: id });
  }
  const gifs = await Gifs.find().sort({
    createdAt: -1,
  });

  let response_data = { gifs };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.addGif = tryCatchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  let decoded_token;
  if (token) {
    decoded_token = await promisify(jwt.verify)(token, `cemetry@management%secrect*Key_hashing85@10LD^System(SMTP)_Garisson--PVT`);
  }

  const user_id = decoded_token ? decoded_token.id : "";
  req.body.forEach((item) => {
    item.user_id = user_id;
  });
  const gif = await Gifs.create(req.body);

  let response_data = { gif };
  return apiResponse.successResponse(res, response_data, "", created);
});

exports.deleteGif = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  const gif = await Gifs.findOneAndDelete(query);

  if (!gif) throw new AppError("Not found", notFound);

  let response_data = { gif };
  return apiResponse.successResponse(
    res,
    response_data,
    "File deleted",
    success
  );
});

exports.updateGif = tryCatchAsync(async (req, res) => {
  let { name, id } = req.body;

  const gif = await Gifs.findOne({ _id: id });

  gif.name = name;

  await gif.save();

  let response_data = { gif };
  return apiResponse.successResponse(res, response_data, "", success);
});

//Pictures Controller

exports.getAllPictures = tryCatchAsync(async (req, res) => {
  const pictures = await Pictures.find().sort({
    createdAt: -1,
  });

  let response_data = { pictures };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.deleteAllPictures = tryCatchAsync(async (req, res) => {
  const { id } = req.body;

  if (id == null) {
    await Pictures.deleteMany({ type: "public" });
  } else {
    await Pictures.deleteMany({ type: "private", user_id: id });
  }
  const pictures = await Pictures.find().sort({
    createdAt: -1,
  });
  let response_data = { pictures };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.addPicture = tryCatchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  let decoded_token;
  if (token) {
    decoded_token = await promisify(jwt.verify)(token, `cemetry@management%secrect*Key_hashing85@10LD^System(SMTP)_Garisson--PVT`);
  }

  const user_id = decoded_token ? decoded_token.id : "";
  req.body.forEach((item) => {
    item.user_id = user_id;
  });

  const picture = await Pictures.create(req.body);

  let response_data = { picture };
  return apiResponse.successResponse(res, response_data, "", created);
});

exports.deletePicture = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  const picture = await Pictures.findOneAndDelete(query);

  if (!picture) throw new AppError("Not found", notFound);

  let response_data = { picture };
  return apiResponse.successResponse(
    res,
    response_data,
    "File deleted",
    success
  );
});

exports.updatePicture = tryCatchAsync(async (req, res) => {
  let { name, id } = req.body;

  const picture = await Pictures.findOne({ _id: id });

  picture.name = name;

  await picture.save();

  let response_data = { picture };
  return apiResponse.successResponse(res, response_data, "", success);
});

//Videos Controller

exports.getAllVideos = tryCatchAsync(async (req, res) => {
  const videos = await Videos.find().sort({
    createdAt: -1,
  });

  let response_data = { videos };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.deleteAllVideos = tryCatchAsync(async (req, res) => {
  const { id } = req.body;
  if (id == null) {
    await Videos.deleteMany({ type: "public" });
  } else {
    await Videos.deleteMany({ type: "private", user_id: id });
  }
  const videos = await Videos.find().sort({
    createdAt: -1,
  });

  let response_data = { videos };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.addVideo = tryCatchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  let decoded_token;
  if (token) {
    decoded_token = await promisify(jwt.verify)(token, `cemetry@management%secrect*Key_hashing85@10LD^System(SMTP)_Garisson--PVT`);
  }

  const user_id = decoded_token ? decoded_token.id : "";
  req.body.forEach((item) => {
    item.user_id = user_id;
  });

  const video = await Videos.create(req.body);

  let response_data = { video };
  return apiResponse.successResponse(res, response_data, "", created);
});

exports.deleteVideo = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  const video = await Videos.findOneAndDelete(query);

  if (!video) throw new AppError("Not found", notFound);

  let response_data = { video };
  return apiResponse.successResponse(
    res,
    response_data,
    "File deleted",
    success
  );
});

exports.updateVideo = tryCatchAsync(async (req, res) => {
  let { name, id } = req.body;

  const video = await Videos.findOne({ _id: id });

  video.name = name;

  await video.save();

  let response_data = { video };
  return apiResponse.successResponse(res, response_data, "", success);
});

//Music Controller

exports.getAllMusics = tryCatchAsync(async (req, res) => {
  const musics = await Musics.find().sort({
    createdAt: -1,
  });

  let response_data = { musics };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.deleteAllMusics = tryCatchAsync(async (req, res) => {
  const { id } = req.body;
  if (id == null) {
    await Musics.deleteMany({ type: "public" });
  } else {
    await Musics.deleteMany({ type: "private", user_id: id });
  }
  const musics = await Musics.find().sort({
    createdAt: -1,
  });
  let response_data = { musics };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.addMusic = tryCatchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  let decoded_token;
  if (token) {
    decoded_token = await promisify(jwt.verify)(token, `cemetry@management%secrect*Key_hashing85@10LD^System(SMTP)_Garisson--PVT`);
  }

  const user_id = decoded_token ? decoded_token.id : "";
  req.body.forEach((item) => {
    item.user_id = user_id;
  });

  const music = await Musics.create(req.body);

  let response_data = { music };
  return apiResponse.successResponse(res, response_data, "", created);
});

exports.deleteMusic = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  const gif = await Musics.findOneAndDelete(query);

  if (!gif) throw new AppError("Not found", notFound);

  let response_data = { gif };
  return apiResponse.successResponse(
    res,
    response_data,
    "File deleted",
    success
  );
});

exports.updateMusic = tryCatchAsync(async (req, res) => {
  let { name, id } = req.body;

  const music = await Musics.findOne({ _id: id });

  music.name = name;

  await music.save();

  let response_data = { music };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.updateBackground = tryCatchAsync(async (req, res) => {

  let { background, property, video } = req.body;

  const data = await Background.findOne({});

  if (!data) {
    const background_data = await Background.create(req.body);

    let response_create_data = { background: background_data };
    return apiResponse.successResponse(res, response_create_data, "", success);
  }

  console.log(data);

  data.video = video ? video : "";
  data.property = property ? property : "";
  data.background = background ? background : "";


  await data.save();

  let response_data = { background: data };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.background = tryCatchAsync(async (req, res) => {
  const background = await Background.findOne({});

  let response_data = { background };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.backgroundMusic = tryCatchAsync(async (req, res) => {
  let { music } = req.body;

  const data = await BackgroundMusic.findOne({});

  if (!data) {
    const background_data = await BackgroundMusic.create(req.body);

    let response_create_data = { music: background_data };
    return apiResponse.successResponse(res, response_create_data, "", success);
  }

  data.music = music ? music : "";

  await data.save();

  let response_data = { music: data };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.outfit = tryCatchAsync(async (req, res) => {
  let { outfit } = req.body;
  const data = await BackgroundMusic.findOne({});

  data.outfit = outfit;

  await data.save();

  let response_data = { outfit: data };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.getBackgroundMusic = tryCatchAsync(async (req, res) => {
  const music = await BackgroundMusic.findOne();

  let response_data = { music };
  return apiResponse.successResponse(res, response_data, "", success);
});

exports.deleteAllChat = tryCatchAsync(async (req, res) => {
  await PublicChat.deleteMany({});
  let response_data = { messages: [] };
  return apiResponse.successResponse(res, response_data, "", success);
});
