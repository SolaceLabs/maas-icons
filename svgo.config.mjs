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

export default {
  floatPrecision: 4,
  multipass: true,
  plugins: [
    "cleanupAttrs",
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeTitle",
    "removeDesc",
    "removeUselessDefs",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeViewBox",
    "cleanupEnableBackground",
    "minifyStyles",
    "convertStyleToAttrs",
    "convertColors",
    "convertPathData",
    "convertTransform",
    "removeUnknownsAndDefaults",
    "removeNonInheritableGroupAttrs",
    {
      name: "removeUselessStrokeAndFill",
      params: {
        // https://github.com/svg/svgo/issues/727#issuecomment-303115276
        removeNone: true,
      },
    },
    "removeUnusedNS",
    "cleanupIds",
    "cleanupNumericValues",
    "cleanupListOfValues",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "removeRasterImages",
    "mergePaths",
    "convertShapeToPath",
    "sortAttrs",
    "removeDimensions",
    "removeElementsByAttr",
    "removeStyleElement",
    "removeScriptElement",
    "removeEmptyContainers",
    {
      name: "removeAttrs",
      params: {
        attrs: ["fill", "class"],
      },
    },
  ],
};
