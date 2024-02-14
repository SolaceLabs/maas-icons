/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs").promises;
const fsp = require("fs");
const camelcase = require("camelcase");
const outDir = "reactGenerated";
const path = require("path");
const fse = require("fs-extra");
const replaceXmlSpaceInFiles = require("./replaceTags");

/**
 * This function generates a React component for an SVG icon.
 *
 * @param {string} svg - The SVG content.
 * @param {string} componentName - The name of the React component.
 * @returns {string} The generated React component code.
 */
async function generateSvgComponent(svg, componentName) {
  const code = `
import { createSvgIcon } from "@mui/material/utils";
const ${componentName} = createSvgIcon(
  ${svg}
, '${componentName}');
export default ${componentName};
  `;

  return code;
}

/**
 * This function converts a directory name to a human-readable format.
 *
 * @param {string} directoryName - The directory name to convert.
 * @returns {string} The converted directory name.
 */
function convertToHumanReadable(directoryName) {
  const segments = directoryName
    .split("/")
    .filter((segment) => segment !== "optimized")
    .map((segment) => segment.replace("px", ""));
  // reverse is to handle the naming convention of the icons, where the size is at the end
  return segments.reverse().join("");
}

/**
 * This function checks the contents of a directory and returns an object
 * with properties indicating whether the directory is empty, contains subdirectories,
 * contains files, and a list of the filenames.
 *
 * @param {string} dir - The directory to check.
 * @returns {Object} An object with properties indicating the contents of the directory.
 */
async function checkDirectoryContents(dir) {
  const files = await fs.readdir(`./${dir}`);
  let fileOnlyList = [];
  const result = {
    isEmpty: files.length === 0,
    hasSubdirectory: false,
    hasFiles: false,
  };
  for (const file of files) {
    const absolutePath = path.join(dir, file);
    if (fsp.statSync(absolutePath).isDirectory()) {
      result.hasSubdirectory = true;
    } else {
      result.hasFiles = true;
      fileOnlyList.push(file); // add file to the list
    }
  }
  result.files = fileOnlyList; // add the file list to the result
  return result;
}

/**
 * This function reads SVG files from a directory, generates a React component for each SVG,
 * and returns an array of objects, each containing the SVG content and the component name.
 *
 * @param {string} dir - The directory to read SVG files from.
 * @returns {Array} An array of objects, each containing the SVG content and the component name.
 */
async function getIcons(dir) {
  const directoryContents = await checkDirectoryContents(dir);
  if (
    !directoryContents.isEmpty &&
    directoryContents.hasFiles &&
    Array.isArray(directoryContents.files)
  ) {
    const files = directoryContents.files;

    const humanReadableDirName = convertToHumanReadable(dir);

    return Promise.all(
      files.map(async (file) => {
        const baseName = path.basename(file, ".svg");
        const iconName = `${baseName}${humanReadableDirName}Icon`;
        return {
          svg: await fs.readFile(path.join(dir, file), "utf8"),
          componentName: camelcase(iconName, { pascalCase: true }),
        };
      })
    );
  } else {
    return [];
  }
}

/**
 * This function generates export statements for all icons.
 *
 * @param {Array} icons - An array of objects, each containing the SVG content and the component name.
 * @returns {string} The generated export statements.
 */
function exportAll(icons) {
  return icons
    .map(
      ({ componentName }) =>
        `export { default as ${componentName} } from './${componentName}';`
    )
    .join("\n");
}

/**
 * This function writes text to a file, creating the file and its parent directories if they don't exist.
 *
 * @param {string} file - The file to write to.
 * @param {string} text - The text to write.
 */
async function writeFileEnsureDir(file, text) {
  try {
    const dir = path.dirname(file);
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(file, text + "\n", "utf8");
  } catch (error) {
    console.error(`Failed to write file: ${error}`);
  }
}

/**
 * This function lists all directories under a given directory recursively.
 *
 * @param {string} directory - The directory to list directories from.
 * @returns {Array} An array of directory paths.
 */
function listDirectoriesRecursively(directory) {
  let dirList = [];
  fsp.readdirSync(directory).forEach((file) => {
    const absolute = path.join(directory, file);
    if (fsp.statSync(absolute).isDirectory()) {
      dirList.push(absolute);
      dirList = dirList.concat(listDirectoriesRecursively(absolute));
    }
  });
  return dirList;
}

/**
 * This function builds React components for SVG icons.
 * It reads SVG files from directories under "./optimized",
 * generates a React component for each SVG,
 * and writes the components to files in the "reactGenerated" directory.
 * It also generates an index file that exports all components.
 */
async function buildIcons() {
  const directories = listDirectoriesRecursively("./optimized");
  for (const dir of directories) {
    const icons = await getIcons(dir);
    if (icons.length > 0) {
      await Promise.all(
        icons.flatMap(async ({ componentName, svg }) => {
          const content = await generateSvgComponent(svg, componentName);
          const types = [
            `import { SvgIconProps } from "@mui/material";`,
            `declare const ${componentName}: SvgIconProps;`,
            `export default ${componentName};`,
          ];
          return [
            writeFileEnsureDir(`${outDir}/${componentName}.tsx`, content),
            writeFileEnsureDir(
              `${outDir}/${componentName}.d.ts`,
              types.join("\n") + "\n"
            ),
          ];
        })
      );
      await writeFileEnsureDir(`${outDir}/index.tsx`, exportAll(icons));
      await writeFileEnsureDir(`${outDir}/index.d.ts`, exportAll(icons, false));
    } else {
      console.log(`No icons found in directory ${dir}.`);
    }
  }
}

/**
 * This script generates React components for SVG icons.
 * It reads SVG files from directories under "./optimized",
 * generates a React component for each SVG,
 * and writes the components to files in the "reactGenerated" directory.
 * It also generates an index file that exports all components.
 *
 * After generating the components, it replaces "xml:space" with "xmlSpace" in all files,
 * and copies all files from "reactGenerated" to the "src" directory.
 *
 * The script logs messages to the console indicating the progress of the operation.
 */
async function main() {
  console.log(`Building react icons package...`);
  console.log(`Output directory: ${outDir}`);
  try {
    await buildIcons();
    console.log(`Finished building react icons package.`);
    await replaceXmlSpaceInFiles();
    // Copy all data from outputDir to src folder
    await fse.copy(outDir, "src");
    console.log("Data copied to src folder.");
  } catch (error) {
    console.error(`Error building react icons package: ${error}`);
  }
}

main();
