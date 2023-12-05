const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const backgroundSchema = new mongoose.Schema(
  {
    background: {
      type: String,
      default:""
    },
    property: {
      type: String,
      default:""
    },
    video: {
      type: String,
      default:""
    },
  },
  { timestamps: true }
);

const Background = mongoose.model("Background", backgroundSchema, 'background');

module.exports = Background;
