"use strict";

const bcrypt = require("bcrypt");

const { generateAccessToken } = require("../utilities/jwt");
const { User } = require("../models");
const BadRequestException = require("../exceptions/BadRequestException");

class AuthController {
  /**
   * Logs a user in
   *
   * @method login
   * @memberof AuthController
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns Promise<Object>
   */
  static async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) throw new BadRequestException("Please enter your username & password");
    const user = await User.where({ username }).fetch();
    if (!user) throw new BadRequestException("Username or password is incorrect");

    const passwordCorrect = await bcrypt.compare(password, user.attributes.password);
    if (!passwordCorrect) throw new BadRequestException("Username or password is incorrect");

    const token = generateAccessToken({ username });

    return res.json({
      status: "success",
      message: "Login successful",
      data: {
        token
      }
    });
  }
}

module.exports = AuthController;
