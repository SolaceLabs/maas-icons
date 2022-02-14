/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const enums = [];

const scan = (folder) => {
  fs.readdirSync(folder).forEach((file) => {
    const filepath = `${folder}/${file}`;
    const stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      scan(filepath);
    }
    if (filepath.endsWith(".svg")) {
      // expectations for folder structure: <src>/<size>/<filename.svg>
      let [_dot, src, size, name] = filepath.split("/");
      name = path.basename(name, ".svg"); // remove extenstion
      enums.push(
        `  ${name}_${size.replace("px", "")} = "${src}_${size}_${name}",`
      );
    }
  });
};

scan("./icons");

enums.sort();
enums.unshift("export enum Icons {");
enums.push("}\n");

const source = enums.join("\n");
console.log(source);

fs.writeFile("src/icons.ts", source, function (err) {
  if (err) throw err;
  console.log("Icons type file generated successfully.");
});
