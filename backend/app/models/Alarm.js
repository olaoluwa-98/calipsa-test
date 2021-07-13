"use strict";

const { bookshelf } = require("./bookshelf");

const Alarm = bookshelf.model("Alarm", {
  hasTimestamps: true,
  requireFetch: false,
  tableName: "alarms",
  location() {
    return this.belongsTo("Location", "location", "id");
  }
});

module.exports = Alarm;
