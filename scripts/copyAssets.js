/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
