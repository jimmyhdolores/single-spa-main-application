/**
 * Description: This class is used for getting log details
 */
const promise = require("promise");
const fs = require("fs");
const path = require("path");
const filePath = "./single-spa-logger.log";
const auditFilePath = "./single-spa-audit.log";
const logger = require("../service/logger").makeObject();
const os = require("os");
const lineReader = require("line-reader");

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

  writeAuditDataToFile(req) {
    logger.info("LoggingDetails|writeAuditDataToFile|auditData ");
    try {
      return new Promise((resolve, reject) => {
        let body = "";
        let bodyData = "";
        let auditFileContent = [];
        req.on("data", (chunk) => {
          body += chunk.toString();
          bodyData = JSON.parse(body);
          auditFileContent = bodyData.auditDataContent;
          for (var i = 0; i < auditFileContent.length; i++) {
            let line =
              "eventName: " +
              auditFileContent[i].eventName +
              "," +
              "eventData: " +
              auditFileContent[i].eventData +
              "," +
              "time: " +
              auditFileContent[i].time +
              ",";
            fs.open(auditFilePath, "a", 666, function (e, id) {
              fs.write(id, line + os.EOL, null, "utf8", function () {});
            });
          }
          resolve("Writing To Audit File Completed");
        });
      });
    } catch (err) {
      logger.error(
        "Error Occured in WindowCommands|FileManipulation|fileValueEdit ",
        err
      );
    }
  }

  getAllAuditData() {
    try {
      let o = {};
      let key = "auditData";
      o[key] = [];
      return new Promise((resolve, reject) => {
        let lines = [];
        let stringData = [];
        fs.readFile(auditFilePath, "utf8", function (err, data) {
          lines = data.split(/\r?\n/);
          for (var i = 0; i < lines.length - 1; i++) {
            stringData = lines[i].split(",");
            console.log("==stringData== ", stringData);
            let auditEventName = stringData[0].split(":");
            let auditEventData = stringData[1].split(":");
            let auditEventTime = stringData[2].split(":");
            let data = {
              eventName: auditEventName[1],
              eventData: auditEventData[1],
              time: auditEventTime[1],
            };
            o[key].push(data);
          }
          resolve(o);
        });
      });
    } catch (err) {
      logger.error("Error Occured in LoggingDetails|getAllAuditData ", err);
    }
  }
}
module.exports = LoggingDetails;
