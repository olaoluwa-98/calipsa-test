"use strict";

const Alarm = require("./Alarm");
const { bookshelf, knex } = require("./bookshelf");
const Location = require("./Location");
const User = require("./User");

module.exports = {
  Alarm,
  Location,
  User,
  knex,
  bookshelf
};
