const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const backgroundMusicSchema = new mongoose.Schema(
  {
    music: {
      type: String,
      default: "",
    },
    outfit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BackgroundMusic = mongoose.model("BackgroundMusic", backgroundMusicSchema, 'backgroundmusic');

module.exports = BackgroundMusic;
