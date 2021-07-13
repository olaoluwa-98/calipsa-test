"use strict";

const bcrypt = require("bcrypt");

const bookshelf = require("./bookshelf");

const User = bookshelf.model("User", {
  hasTimestamps: true,
  requireFetch: false,
  hidden: ["password"],
  tableName: "users",
  initialize: function () {
    this.on("creating", this.hashPassword, this);
  },
  hashPassword: function (model, attrs, options) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(model.attributes.password, 10, function (err, hash) {
        if (err) reject(err);
        model.set("password", hash);
        resolve(hash); // data is created only after this occurs
      });
    });
  }
});

module.exports = User;
