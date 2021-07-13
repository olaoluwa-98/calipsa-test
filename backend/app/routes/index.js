"use strict";

const express = require("express");
const alarms = require("./alarms");
const auth = require("./auth");

const router = express.Router();

router.use("/alarms", alarms);
router.use("/auth", auth);

module.exports = router;
