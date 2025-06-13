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

/* eslint-disable @typescript-eslint/no-var-requires */
// Import the promises version of the fs module for file I/O operations
const fs = require("fs").promises;
// Import the path module for handling and transforming file paths
const path = require("path");

// Define the directory where the files to be processed are located
const outDir = "reactGenerated";

/**
 * This function replaces all occurrences of "xml:space" with "xmlSpace" in all files in a given directory.
 * If a file does not contain "xml:space", no changes are made to that file.
 */
async function replaceXmlSpaceInFiles() {
  // Read the directory and get an array of filenames
  const filenames = await fs.readdir(outDir);

  // Loop over each filename
  for (const filename of filenames) {
    // Construct the full path for the file
    const filePath = path.join(outDir, filename);

    // Read the file
    let data = await fs.readFile(filePath, "utf8");

    // Replace all occurrences of "xml:space" with "xmlSpace"
    const newData = data.replace(/xml:space/g, "xmlSpace");

    // If the original data is different from the new data,
    // it means that at least one replacement was made
    if (data !== newData) {
      // Log a message indicating that a replacement was made
      // console.log(`Replaced "xml:space" with "xmlSpace" in ${filename}`);

      // Write the new data back to the file
      await fs.writeFile(filePath, newData, "utf8");
    } else {
      // If the original data is the same as the new data,
      // it means that no replacements were made
      // Log a message indicating that no replacements were made
      // console.log(`No "xml:space" found in ${filename}`);
    }
  }
}

module.exports = replaceXmlSpaceInFiles;
