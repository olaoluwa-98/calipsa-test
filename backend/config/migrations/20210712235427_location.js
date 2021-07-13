"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("locations", function (table) {
    table.integer("id").notNullable().primary();
    table.string("name").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("locations");
};
