"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./app/routes");
const { errorHandler } = require("./app/middlewares/error");

const app = express();

app.use(logger("combined"));
// app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const API_V1 = "/v1";
app.use(API_V1, router);
app.use(errorHandler);

module.exports = app;
