"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token || !token.startsWith("Bearer ")) return res.status(401).send({ message: "Invalid or missing JWT token" });
  token = token.split("Bearer ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Invalid JWT token" });
    req.user = user;
    next();
  });
};

module.exports = auth;
