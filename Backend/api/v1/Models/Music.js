const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    file_type: {
      type: String,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
      default: "public",
    },
    user_id: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Musics = mongoose.model("Musics", musicsSchema, 'music');

module.exports = Musics;
