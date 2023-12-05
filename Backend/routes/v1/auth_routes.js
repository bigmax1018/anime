const express = require("express");
const router = express.Router();

const auth = require("../../api/v1/Controllers/Auth/AuthienticationController");

router.post("/login", auth.login);
router.patch("/video", auth.video);
router.patch("/music", auth.music);
router.post("/signup", auth.signUp);
router.patch("/update", auth.update);
router.delete("/delete", auth.delete);
router.post("/recover", auth.recover);
router.get("/isLoggedIn", auth.isLoggedIn);
router.patch("/addFriend/", auth.addFriend);
router.patch("/background", auth.background);
router.patch("/picture", auth.addProfilePicture);
router.patch("/relationship", auth.addRelationship);
router.patch("/removeFriend/", auth.removeFriend);
router.post("/forgotPassword", auth.forgotPassword);

module.exports = router;
