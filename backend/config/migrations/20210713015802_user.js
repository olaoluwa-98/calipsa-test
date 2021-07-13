"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("username").notNullable().unique();
    table.string("password", 255).notNullable();
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
