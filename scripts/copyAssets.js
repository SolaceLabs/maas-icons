// This script copies both the optimized images folder and the optimized illustrations folder to the dist folder.

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

/**
 * Recursively copies files and directories from source to target.
 * @param {string} sourceDir - The source directory.
 * @param {string} targetDir - The target directory.
 */
function copyAssets(sourceDir, targetDir) {
  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(sourceDir, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);

        fs.stat(sourceFile, (err, stats) => {
          if (err) throw err;

          if (stats.isDirectory()) {
            // Recursively copy subdirectories
            copyAssets(sourceFile, targetFile);
          } else {
            // Copy files
            fs.copyFile(sourceFile, targetFile, (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  });
}

// Define the source and target directories for illustrations and images
const assetsToCopy = [
  { source: "./optimizedIllustrations", target: "./dist/illustrations" },
  { source: "./optimizedImages", target: "./dist/images" },
];

// Copy each asset
assetsToCopy.forEach(({ source, target }) => {
  copyAssets(source, target);
  console.log(`Assets copied from ${source} to ${target}`);
});
