const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const fileName = args[0];

if (!fileName) {
  console.error("Usage: npm run xlsx:one -- <excel-file>");
  process.exit(1);
}

const workbookPath = path.join("cypress", "fixtures", "excel", fileName);

if (!fs.existsSync(workbookPath)) {
  console.error(`Workbook not found: ${workbookPath}`);
  process.exit(1);
}

const baseName = path.basename(fileName, path.extname(fileName));
const outputPath = path.join(
  "cypress",
  "fixtures",
  "master-file",
  `${baseName}.json`,
);

const workbook = xlsx.readFile(workbookPath);

const jsonOutput = {};

workbook.SheetNames.filter((sheet) => sheet !== "README").forEach(
  (sheetName) => {
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet, {
      defval: "",
      raw: false,
    });

    jsonOutput[sheetName] = data;
  },
);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));

console.log(`Created JSON fixture: ${outputPath}`);
