const mongoose = require("mongoose");

const gifsSchema = new mongoose.Schema(
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

const Gifs = mongoose.model("Gifs", gifsSchema, 'gif');

module.exports = Gifs;
