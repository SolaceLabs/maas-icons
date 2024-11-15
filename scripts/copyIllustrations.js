/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs"); // Node.js File System module for file I/O operations
const path = require("path"); // Node.js Path module for handling and transforming file paths

// Define the source and target directories
const sourceDir = "./optimizedIllustrations";
const targetDir = "./dist/illustrations";

// Create the target directory if it doesn't exist
// The `recursive: true` option is used to create parent directories as needed
fs.mkdir(targetDir, { recursive: true }, (err) => {
  if (err) throw err; // If an error occurred during directory creation, throw the error

  // Read the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err; // If an error occurred during reading the directory, throw the error

    // For each file in the source directory
    files.forEach((file) => {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);

      fs.stat(sourceFile, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          fs.mkdir(targetFile, { recursive: true }, (err) => {
            if (err) throw err;

            fs.readdir(sourceFile, (err, subFiles) => {
              if (err) throw err;

              subFiles.forEach((subFile) => {
                const sourceSubFile = path.join(sourceFile, subFile);
                const targetSubFile = path.join(targetFile, subFile);

                fs.copyFile(sourceSubFile, targetSubFile, (err) => {
                  if (err) throw err;
                });
              });
            });
          });
        } else {
          fs.copyFile(sourceFile, targetFile, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
  console.log("Illustrations copied successfully");
});
