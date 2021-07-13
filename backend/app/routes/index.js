"use strict";

const express = require("express");
const alarms = require("./alarms");

const router = express.Router();

router.use("/alarms", alarms);

module.exports = router;
