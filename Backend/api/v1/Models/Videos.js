const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videosSchema = new mongoose.Schema(
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
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    user_id: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("Videos", videosSchema, 'video');

module.exports = Videos;
