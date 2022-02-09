const fs = require("fs");
const path = require("path");
const src = "./icons";
const enums = ["export enum Icons {"];

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

scan(src);

enums.push("}\n");
console.log(enums.join("\n"));

fs.writeFile("src/icons.ts", enums.join("\n"), function (err) {
  if (err) throw err;
  console.log("Icons type file generated successfully.");
});
