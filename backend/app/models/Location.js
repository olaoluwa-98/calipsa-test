"use strict";

const bookshelf = require("./bookshelf");

const Location = bookshelf.model("Location", {
  hasTimestamps: false,
  requireFetch: false,
  tableName: "locations",
  alarms() {
    return this.hasMany("Alarm", "location");
  }
});

module.exports = Location;
