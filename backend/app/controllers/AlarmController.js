"use strict";

const { Alarm } = require("../models");
const BadRequestException = require("../exceptions/BadRequestException");

class AlarmController {
  /**
   * Returns a JSON response of alarms data
   *
   * @method getAlarms
   * @memberof AlarmController
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns Promise<Object>
   */
  static async getAlarms(req, res) {
    const { page = 1, pageSize = 10, timestamp_from, timestamp_to = new Date(), outcome } = req.query;
    if (pageSize > 200) throw new BadRequestException("pageSize should be at most 200");
    const data = await Alarm.query(qb => {
      if (timestamp_from) {
        qb.where("timestamp", ">=", new Date(timestamp_from));
      }
      if (timestamp_to) {
        qb.where("timestamp", "<=", new Date(timestamp_to));
      }
      if (outcome != null && (outcome == "1" || outcome == "true")) qb.where("outcome", "=", 1);
      else if (outcome != null && (outcome == "0" || outcome == "false")) qb.where("outcome", 0);
    }).fetchPage({
      pageSize,
      page,
      withRelated: ["location"]
    });

    return res.json({
      status: "success",
      message: "Alarms retrieved",
      data,
      meta: data.pagination
    });
  }
}

module.exports = AlarmController;
