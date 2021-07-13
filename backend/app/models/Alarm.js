const bookshelf = require("./bookshelf");

const Alarm = bookshelf.model("Alarm", {
  hasTimestamps: true,
  requireFetch: false,
  hidden: ["id"],
  tableName: "alarms",
  location() {
    return this.belongsTo("Location", "location", "id");
  }
});

module.exports = Alarm;
