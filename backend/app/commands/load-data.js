"use strict";
const _ = require("lodash");

const { knex } = require("../models");
const alarmsData = require("../data/data.1625586027.json");
const logger = require("../utilities/logger");

const loadFileToDb = async () => {
  // break arrays into chunks of 100
  const locationChunks = _.chunk(alarmsData.locations, 100);

  for (const chunk of locationChunks) {
    await knex.insert(chunk).into("locations");
  }

  // break arrays into chunks of 100
  const alarmChunks = _.chunk(alarmsData.alarms, 100);
  for (const chunk of alarmChunks) {
    await knex
      .insert(
        chunk.map(({ location, outcome, timestamp }) => {
          return { location, outcome, timestamp: new Date(timestamp) };
        })
      )
      .into("alarms");
  }
};

loadFileToDb()
  .then(() => {
    logger.info("Success loading json data into database");
    knex.destroy();
  })
  .catch(err => {
    knex.destroy();
    logger.error(err);
    logger.error("Error loading json data into database");
  });
