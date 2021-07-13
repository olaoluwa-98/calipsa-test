"use strict";

const express = require("express");

const AlarmController = require("../controllers/AlarmController");
const { wrapAsync } = require("../middlewares/error");

const router = express.Router();

router.get("/", wrapAsync(AlarmController.getAlarms));

module.exports = router;
