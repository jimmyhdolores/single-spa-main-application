/**
 * Description: This class is used for showing a tree structure for all the folders.
 */
const promise = require("promise");
const fs = require("fs");
const directory = "C:/FilesFolderData";
const PATH = require("path");
const async = require("async");
const logger = require("../service/logger").makeObject();

class FolderDetails {
  constructor() {
    console.log("FolderDetails");
    this.x;
  }

  /**
   * This static function is used to create a singleton object
   * return type of method is instance of class
   */
  static makeObject() {
    if (!this.x) {
      this.x = new FolderDetails();
    }
    return this.x;
  }

  /**
   * This function is used for creating the tree folder structure
   * using fs.readdir
   *
   */
  getFolderDetails() {
    logger.info("FolderDetails|getFolderDetails ");
    try {
      return new Promise((resolve, reject) => {
        var createFolderStructure = function (dir, folderName, type, done) {
          var results = {
            name: folderName,
            type: type,
            children: [],
          };
          fs.readdir(dir, function (err, list) {
            if (err) {
              return done(err);
            }
            var pending = list.length;
            if (!pending) {
              return done(null, results);
            }
            logger.debug("FolderDetails|getFolderDetails|listdata ", list);
            async.each(
              list,
              function (file) {
                fs.stat(dir + "/" + file, function (err, stat) {
                  if (stat && stat.isDirectory()) {
                    createFolderStructure(
                      dir + "/" + file,
                      file,
                      "directory",
                      function (err, res) {
                        results.children.push(res);
                        if (!--pending) {
                          done(null, results);
                        }
                      }
                    );
                  } else {
                    results.children.push({
                      name: file,
                      path: dir + "/" + file,
                      type: "file",
                    });
                    if (!--pending) {
                      done(null, results);
                    }
                  }
                });
              },
              function (err) {
                callback(err, returnFiles);
              }
            );
          });
        };
        createFolderStructure(directory, "folderData", "directory", function (
          err,
          results
        ) {
          if (err) console.log("Error While Creating Directory ", err);
          logger.debug("FolderDetails|getFolderDetails|finalResult ", results);
          resolve(results);
        });
      });
    } catch (err) {
      logger.error("Error Occured in FolderDetails|getFolderDetails ", err);
    }
  }
}
module.exports = FolderDetails;
