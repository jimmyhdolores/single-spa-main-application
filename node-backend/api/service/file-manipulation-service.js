/**
 * Description: This class is used for file manipulation
 */
const filePath = "C:/Application/nodejs/single-spa-main-application/npmrc";
const lineReader = require("line-reader");
const promise = require("promise");
const fs = require("fs");
const os = require("os");
const logger = require("../service/logger").makeObject();

class FileManipulation {
  constructor() {
    console.log("FileManipulation");
    this.x;
  }
  static makeObject() {
    if (!this.x) {
      this.x = new FileManipulation();
    }
    return this.x;
  }

  /**
   * This function is used for reading file and returning response
   */
  fileRead() {
    try {
      let o = {};
      let key = "NPMRCData";
      o[key] = [];
      return new Promise((resolve, reject) => {
        lineReader.eachLine(filePath, function (line) {
          let lineData = line;
          let stringData = lineData.split("=");
          let data = {
            key: stringData[0],
            value: stringData[1],
          };
          o[key].push(data);
        });
        setTimeout(() => {
          logger.debug("FileManipulation|fileRead|finalData ", o);
          resolve(o);
        }, 10);
      });
    } catch (err) {
      logger.error(
        "Error Occured in WindowCommands|FileManipulation|fileRead ",
        err
      );
    }
  }

  /**
   * This function is used for writing file and returning response
   */
  fileWrite(req) {
    try {
      let fileContent = req.params.key + "=" + req.params.value;
      logger.info("FileManipulation|fileWrite|fileContent ", fileContent);
      return new Promise((resolve, reject) => {
        fs.open(filePath, "a", 666, function (e, id) {
          fs.write(id, fileContent + os.EOL, null, "utf8", function () {
            fs.close(id, function () {
              resolve("Writing Completed");
            });
          });
        });
      });
    } catch (err) {
      logger.error(
        "Error Occured in WindowCommands|FileManipulation|fileWrite ",
        err
      );
    }
  }

  /**
   * This function is used for editing value for key in file and returning response
   */
  fileValueEdit(req) {
    let replaceValue;
    logger.info("FileManipulation|fileValueEdit|value ", req.params.key);
    try {
      return new Promise((resolve, reject) => {
        lineReader.eachLine(filePath, function (line) {
          let lineData = line;
          let stringData = lineData.split("=");
          if (stringData[0].toString() === req.params.key.toString()) {
            replaceValue = stringData[1].toString();
          }
        });
        setTimeout(function () {
          fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
              return console.log(err);
            }
            var result = data.replace(replaceValue, req.params.value);
            fs.writeFile(filePath, result, "utf8", function (err) {
              if (err) return console.log(err);
            });
          });
          resolve("Value Modified Sucessfully");
        }, 100);
      });
    } catch (err) {
      logger.error(
        "Error Occured in WindowCommands|FileManipulation|fileValueEdit ",
        err
      );
    }
  }

  /**
   * This function is used for editing key for value in file and returning response
   */
  fileKeyEdit(req) {
    let replaceValue;
    try {
      logger.info("FileManipulation|fileKeyEdit|value ", req.params.value);
      return new Promise((resolve, reject) => {
        lineReader.eachLine(filePath, function (line) {
          let lineData = line;
          let stringData = lineData.split("=");
          if (stringData[1].toString() === req.params.value.toString()) {
            replaceValue = stringData[0].toString();
          }
        });
        setTimeout(function () {
          console.log("replace value " + replaceValue);
          fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
              return console.log(err);
            }
            var result = data.replace(replaceValue, req.params.key);
            fs.writeFile(filePath, result, "utf8", function (err) {
              if (err) return console.log(err);
            });
          });
          resolve("Key Modified Sucessfully");
        }, 100);
      });
    } catch (err) {
      logger.error(
        "Error Occured in WindowCommands|FileManipulation|fileKeyEdit ",
        err
      );
    }
  }
}
module.exports = FileManipulation;
