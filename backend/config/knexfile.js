require("dotenv").config({ path: "../.env" });

const parseDbUrl = require("parse-database-url");
const config = parseDbUrl(process.env.DATABASE_URL);

const dbObj = {
  client: config.driver,
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci"
  },
  migrations: {
    tableName: "knex_migrations"
  },
  debug: process.env.DB_DEBUG,
  // this makes the connection use UTC
  pool: {
    afterCreate: function(connection, callback) {
      connection.query("SET time_zone = '+00:00';", function(err) {
        callback(err, connection);
      });
    }
  }
};
module.exports = {
  development: dbObj,

  staging: dbObj,

  production: dbObj,

  config: dbObj
};
