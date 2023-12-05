const mongoose = require("mongoose");

const publicChatSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    p_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PublicChat", publicChatSchema, 'publicchat');
