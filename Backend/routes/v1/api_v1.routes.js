const express = require("express");
const router = express.Router();
const auth_routes = require("./auth_routes");
const guest_routes = require("./guest_routes");

router.use("/auth", auth_routes);

router.use("/guest", guest_routes);

module.exports = router;
