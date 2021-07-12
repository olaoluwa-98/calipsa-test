"use strict";

const auth = async (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token || !token.startsWith("Bearer ")) return res.status(401).send({ message: "Invalid or missing JWT token" });
  token = token.split("Bearer ")[1];

  try {
    // get user object
    // req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "" });
  }
};

module.exports = auth;
