/**
 * Description: This class is used for Logging Purpose
 */
const loggingLevel = require("../service/logging-level").makeObject();
const SimpleNodeLogger = require("simple-node-logger"),
  opts = {
    logFilePath: "single-spa-logger.log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);
const level = loggingLevel.getLoggingLevel();
log.setLevel(level);

class LoggingDetails {
  constructor() {
    console.log("LoggingDetails");
    this.x;
  }

  /**
   * This static function is used to create a singleton object
   * return type of method is instance of class
   */
  static makeObject() {
    if (!this.x) {
      this.x = new LoggingDetails();
    }
    return this.x;
  }

  /**
   * This function is used for info details
   */
  info(loggingMessage, data) {
    log.info(loggingMessage, data);
  }

  /**
   * This function is used for debug details
   */
  debug(loggingMessage, data) {
    log.debug(loggingMessage, data);
  }

  /**
   * This function is used for error details
   */
  error(errorMessage, data) {
    log.error(errorMessage, data);
  }
}
module.exports = LoggingDetails;
