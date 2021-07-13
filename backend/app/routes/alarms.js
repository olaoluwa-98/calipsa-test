"use strict";

const express = require("express");

const { wrapAsync } = require("../middlewares/error");
const AlarmController = require("../controllers/AlarmController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, wrapAsync(AlarmController.getAlarms));
router.get("/:id", auth, wrapAsync(AlarmController.getAlarm));

module.exports = router;
