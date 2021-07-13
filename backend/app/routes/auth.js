"use strict";

const express = require("express");

const AuthController = require("../controllers/AuthController");
const { wrapAsync } = require("../middlewares/error");

const router = express.Router();

router.post("/", wrapAsync(AuthController.login));

module.exports = router;
