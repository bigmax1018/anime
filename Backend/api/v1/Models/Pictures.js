const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const picturesSchema = new mongoose.Schema(
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

const Pictures = mongoose.model("Pictures", picturesSchema, 'picture');

module.exports = Pictures;
