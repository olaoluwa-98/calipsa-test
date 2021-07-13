"use strict";

const config = require("../../config/knexfile").config;

const knex = require("knex")(config);
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
