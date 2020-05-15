const express = require("express");
const app = express();
const fileManipulation = require("../service/file-manipulation-service").makeObject();
const hardwareDetails = require("../service/hardware-details-service").makeObject();
const folderDetails = require("../service/folder-tree-structure-service").makeObject();
const memoryDetails = require("../service/google-charts-service").makeObject();
const commands = require("../service/angular-terminal-service").makeObject();
const loggingDetails = require("../service/logging-details-service").makeObject();
const logger = require("../service/logger").makeObject();

class ApplicationRouting {
  constructor() {
    this.x;
  }

  static makeObject() {
    if (!this.x) {
      this.x = new ApplicationRouting();
    }
    return this.x;
  }

  readFileRoute(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Reading npmrc file|ApplicationRouting|readFileRoute"
    );
    fileManipulation.fileRead().then((result) => {
      if (result) {
        res.status(200).json({
          fileData: {
            content: result,
          },
        });
      }
    });
  }

  writeFileRoute(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Writing to npmrc file|ApplicationRouting|writeFileRoute"
    );
    fileManipulation.fileWrite(req).then((result) => {
      if (result) {
        res.status(200).json({
          fileData: {
            content: result,
          },
        });
      }
    });
  }

  keyEditFileRoute(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Editing Key to npmrc file|ApplicationRouting|keyEditFileRoute"
    );
    fileManipulation.fileKeyEdit(req).then((result) => {
      if (result) {
        res.status(200).json({
          fileData: {
            content: result,
          },
        });
      }
    });
  }

  valueEditFileRoute(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Editing Value to npmrc file|ApplicationRouting|valueEditFileRoute"
    );
    fileManipulation.fileValueEdit(req).then((result) => {
      if (result) {
        res.status(200).json({
          fileData: {
            content: result,
          },
        });
      }
    });
  }

  getHardwareDetails(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting Hardware Detail|ApplicationRouting|getHardwareDetails"
    );
    const data = hardwareDetails.getHardwareDetails();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            hardwareDetailsData: {
              content: result,
            },
            status: true,
          });
        }
      });
    } else {
      res.status(500).json({
        hardwareDetailsData: {
          content: "Error While Getting SystemHardware Details",
        },
        status: false,
      });
    }
  }

  /**
   * This  function is used to provide the final output i.e the system hardware details
   * return type is response with response code 200
   */
  getFileFolderDetailsDirectoryTree(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting The Directory Structure|ApplicationRouting|getFileFolderDetailsDirectoryTree"
    );
    const data = folderDetails.getFolderDetails();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            folderDetailsData: {
              content: result,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        folderDetailsData: {
          content: "Error While Getting FileFolderDetails Details",
        },
      });
    }
  }

  getMemoryDetails(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting The Memory Detail|ApplicationRouting|getMemoryDetails"
    );
    const data = memoryDetails.getMemoryDetails();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            hardwareDetailsData: {
              content: result,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        hardwareDetailsData: {
          content: "Error While Getting SystemHardware Details",
        },
      });
    }
  }

  getDiskWiseMemoryDetails(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting Disk Wise Memory Detail|ApplicationRouting|getDiskWiseMemoryDetails"
    );
    const data = memoryDetails.getDiskWiseMemoryDetails();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            hardwareDetailsData: {
              content: result,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        hardwareDetailsData: {
          content: "Error While Getting SystemHardware Details",
        },
      });
    }
  }

  executeCommands(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Executing The Command|ApplicationRouting|executeCommands"
    );
    const data = commands.executeCommands(req.params.commands);
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            commandOuput: {
              content: result,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        hardwareDetailsData: {
          content: "Error While Executing Commands",
        },
      });
    }
  }

  getLoggingDetail(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting Log Details|ApplicationRouting|getLoggingDetail"
    );
    const data = loggingDetails.getLoggingDetail();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            loggingOutput: {
              content: result,
              status: true,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        loggingOutput: {
          message: "Error While Getting Logging Details",
          status: false,
        },
      });
    }
  }

  clearLogFile(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Clearing Logs|ApplicationRouting|clearLogFile"
    );
    const data = loggingDetails.clearLogFile();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            loggingOutput: {
              content: result,
              status: true,
            },
          });
        }
      });
    } else {
      res.status(500).json({
        loggingOutput: {
          message: "Error While Clearing Log Details",
          status: false,
        },
      });
    }
  }

  writeAuditDataToFile(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Writing Audit Data|ApplicationRouting|writeAuditDataToFile"
    );
    loggingDetails.writeAuditDataToFile(req).then((result) => {
      if (result) {
        res.status(200).json({
          fileData: {
            content: result,
          },
        });
      }
    });
  }

  getAllAuditData(req, res, next) {
    logger.info(
      "Single-Spa-Application Started For Getting Log Details|ApplicationRouting|getAllAuditData"
    );
    const data = loggingDetails.getAllAuditData();
    if (data) {
      data.then((result) => {
        if (result) {
          res.status(200).json({
            result,
          });
        }
      });
    } else {
      res.status(500).json({
        loggingOutput: {
          message: "Error While Getting Logging Details",
          status: false,
        },
      });
    }
  }
}

module.exports = ApplicationRouting;
