/**
 * Description: This class is used for getting log details
 */
const promise = require("promise");
const fs = require("fs");
const path = require("path");
const filePath = "./single-spa-logger.log";
const logger = require("../service/logger").makeObject();

class LoggingDetails {
  constructor() {
    console.log("LoggingDetails");
    this.x;
  }
  static makeObject() {
    if (!this.x) {
      this.x = new LoggingDetails();
    }
    return this.x;
  }

  /**
   * This function is used for reading the log file
   */
  getLoggingDetail() {
    let replaceValue;
    try {
      logger.info("LoggingDetails|getLoggingDetail ");
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", function (err, data) {
          resolve(data);
        });
      });
    } catch (err) {
      logger.error("Error Occured in LoggingDetails|getLoggingDetail ", err);
    }
  }

  clearLogFile() {
    let replaceValue;
    try {
      logger.info("LoggingDetails|clearLogFile ");
      return new Promise((resolve, reject) => {
        fs.truncate(filePath, 0, function () {
          fs.readFile(filePath, "utf8", function (err, data) {
            resolve("Cleared Logs Data");
          });
        });
      });
    } catch (err) {
      logger.error("Error Occured in |LoggingDetails|clearLogFile ", err);
    }
  }
}
module.exports = LoggingDetails;
