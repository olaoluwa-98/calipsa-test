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
    const { page = 1, pageSize = 10, timestamp_from, timestamp_to = new Date() } = req.query;
    if (pageSize > 200) throw new BadRequestException("pageSize should be at most 200");
    const data = await Alarm.query(qb => {
      if (timestamp_from) {
        qb.where("timestamp", ">=", new Date(timestamp_from));
      }
      if (timestamp_to) {
        qb.where("timestamp", "<=", new Date(timestamp_to));
      }
    }).fetchPage({
      pageSize,
      page,
      withRelated: ["location"]
    });
    
    return res.json({
      status: "success",
      message: "Alarms retrieved",
      data,
      meta: {
        page: Number(page),
        pageSize: Number(pageSize)
      }
    });
  }
}

module.exports = AlarmController;
