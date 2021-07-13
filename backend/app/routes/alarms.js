"use strict";

const express = require("express");

const AlarmController = require("../controllers/AlarmController");
const { wrapAsync } = require("../middlewares/error");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, wrapAsync(AlarmController.getAlarms));

module.exports = router;
