"use strict";

require("dotenv").config();

const logger = require("../utilities/logger");
const { User, knex } = require("../models");

const createUser = async () => {
  return await User.forge({
    username: "elonmusk",
    password: "spacex"
  }).save();
};

createUser()
  .then(data => {
    logger.info(`Success creating user: ${data.attributes.username}`);
    knex.destroy();
  })
  .catch(err => {
    knex.destroy();
    logger.error(err);
    logger.error("Error creating user");
  });
