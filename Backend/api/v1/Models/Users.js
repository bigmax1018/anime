const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Username is required"],
    },
    profile_picture: {
      type: String,
      // required: [true, "Username is required"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email is required"],
    },
    profile_image: {
      type: String,
    },
    dob: {
      type: String,
      // required: [true, "Dob is required"],
    },
    race: {
      type: String,
      // required: [true, "Dob is required"],
    },
    age: {
      type: String,
    },
    star: {
      type: String,
      // required: [true, "Dob is required"],
    },
    zodiac: {
      type: String,
      // required: [true, "Dob is required"],
    },
    planet: {
      type: String,
      // required: [true, "Dob is required"],
    },
    gender: {
      type: String,
      // required: [true, "Gender is required"],
    },
    relationship: {
      type: String,
      default: "active",
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    background: {
      type: String,
    },
    video: {
      type: String,
    },
    property: {
      type: String,
      default: "normal",
      // required: [true, "Gender is required"],
    },
    music: {
      type: String,
    },
    outfit: {
      type: String,
    },
    role: {
      type: String,
      default: "human",
    },
    socketId: {
      type: String,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    password: {
      // required: [true, "password is required"],
      type: String,
      // minlength: 4,
      // select: false,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.isCorrectPassword = async function (
//   password,
//   user_password
// ) {
//   return await bcrypt.compare(password, user_password);
// };

// userSchema.methods.hasPasswordChanged = function (token_issued_date) {
//   if (this.passwordChangedAt) {
//     const changedTimeStamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return token_issued_date < changedTimeStamp;
//   }
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const reset_token = crypto.randomBytes(50).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(reset_token)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return reset_token;
// };
const User = mongoose.model("User", userSchema, 'user');

module.exports = User;
