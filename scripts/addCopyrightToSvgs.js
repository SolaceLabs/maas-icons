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
const fs = require("fs").promises;
const path = require("path");

// Configuration
const START_YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();
const COPYRIGHT_HOLDER = "Solace Systems. All rights reserved.";

// Dynamically generate the copyright header.
const copyrightHeader = `<!--
 Copyright ${START_YEAR}-${CURRENT_YEAR} ${COPYRIGHT_HOLDER}

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
`;

/**
 * Recursively finds all SVG files in a directory
 * @param {string} dir - Directory to search
 * @returns {Promise<string[]>} Array of SVG file paths
 */
async function findSvgFiles(dir) {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await findSvgFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

/**
 * Adds or updates the copyright header in an SVG file.
 * This function is idempotent and can be run multiple times.
 * @param {string} filePath - Path to the SVG file
 */
async function addOrUpdateCopyright(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const copyrightRegex = /<!--\s*Copyright [\d-]+ Solace Systems\. All rights reserved\.[\s\S]*?-->/;

    let updatedContent;

    if (copyrightRegex.test(content)) {
      // If copyright exists, replace it.
      updatedContent = content.replace(copyrightRegex, copyrightHeader);
      console.log(`Updated copyright header in ${filePath}`);
    } else {
      // If no copyright exists, add it.
      // Check if content starts with XML declaration
      const xmlDeclarationRegex = /^\s*<\?xml[^>]*\?>/;
      const xmlMatch = content.match(xmlDeclarationRegex);

      if (xmlMatch) {
        // Insert copyright after XML declaration
        const xmlDeclaration = xmlMatch[0];
        const restOfContent = content.substring(xmlMatch.index + xmlMatch[0].length);
        updatedContent = xmlDeclaration + '\n' + copyrightHeader + restOfContent;
      } else {
        // No XML declaration, add copyright at the beginning
        updatedContent = copyrightHeader + content;
      }
      console.log(`Added copyright header to ${filePath}`);
    }
    
    await fs.writeFile(filePath, updatedContent, 'utf8');

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main function to add or update copyright headers in all SVG files.
 * To run this script, use the command: node scripts/addCopyrightToSvgs.js
 * This will update the copyright year to the current year in all SVG files.
 */
async function main() {
  console.log('Adding or updating copyright headers in SVG files...');
  
  const directories = ['icons', 'illustrations', 'images', 'logo'];
  
  for (const dir of directories) {
    try {
      console.log(`Processing directory: ${dir}`);
      const svgFiles = await findSvgFiles(dir);
      console.log(`Found ${svgFiles.length} SVG files in ${dir}`);
      
      for (const file of svgFiles) {
        await addOrUpdateCopyright(file);
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error.message);
    }
  }
  
  console.log('Finished adding or updating copyright headers in SVG files.');
}

main().catch(console.error);
