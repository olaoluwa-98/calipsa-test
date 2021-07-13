"use strict";

const express = require("express");

const { wrapAsync } = require("../middlewares/error");
const auth = require("../middlewares/auth");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/", wrapAsync(AuthController.login));
router.get("/user", auth, wrapAsync(AuthController.getUser));

module.exports = router;
