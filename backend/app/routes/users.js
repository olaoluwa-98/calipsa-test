"use strict";

const express = require('express');
// const { wrapAsync } = require("../middlewares/error");

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
