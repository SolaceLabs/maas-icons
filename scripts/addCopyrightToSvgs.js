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

const copyrightHeader = `<!--
 Copyright 2023-2025 Solace Systems. All rights reserved.

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
 * Adds copyright header to an SVG file if it doesn't already have one
 * @param {string} filePath - Path to the SVG file
 */
async function addCopyrightToSvg(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Check if copyright header already exists
    if (content.includes('Copyright 2023-2025 Solace Systems')) {
      console.log(`Skipping ${filePath} - copyright header already exists`);
      return;
    }
    
    // Add copyright header before the <svg> tag
    const updatedContent = copyrightHeader + content;
    
    await fs.writeFile(filePath, updatedContent, 'utf8');
    console.log(`Added copyright header to ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main function to add copyright headers to all SVG files
 */
async function main() {
  console.log('Adding copyright headers to SVG files...');
  
  const directories = ['icons', 'illustrations', 'images', 'logo'];
  
  for (const dir of directories) {
    try {
      console.log(`Processing directory: ${dir}`);
      const svgFiles = await findSvgFiles(dir);
      console.log(`Found ${svgFiles.length} SVG files in ${dir}`);
      
      for (const file of svgFiles) {
        await addCopyrightToSvg(file);
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error.message);
    }
  }
  
  console.log('Finished adding copyright headers to SVG files.');
}

main().catch(console.error);
