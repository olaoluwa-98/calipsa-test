"use strict";

const cookieParser = require("cookie-parser");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const router = require("./app/routes");
const { errorHandler } = require("./app/middlewares/error");

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs/access.log"), { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const API_V1 = "/v1";
app.use(API_V1, router);
app.use(errorHandler);

module.exports = app;
