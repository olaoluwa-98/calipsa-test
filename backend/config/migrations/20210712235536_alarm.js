"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("alarms", function (table) {
    table.increments();
    table.integer("location").references("id").inTable("locations").onDelete("SET NULL");
    table.boolean("outcome").notNullable();
    table.timestamp("timestamp").nullable().defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("alarms");
};
