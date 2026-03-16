const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const fileName = args[0];

if (!fileName) {
  console.error("Usage: npm run xlsx:tabs -- <excel-file-name>");
  process.exit(1);
}

const workbookPath = path.join("cypress", "fixtures", "excel", fileName);

if (!fs.existsSync(workbookPath)) {
  console.error(`Workbook not found: ${workbookPath}`);
  process.exit(1);
}

const baseName = path.basename(fileName, path.extname(fileName));
const outputDir = path.join("cypress", "fixtures", "master-file", baseName);

fs.mkdirSync(outputDir, { recursive: true });

const workbook = xlsx.readFile(workbookPath);

workbook.SheetNames.filter((sheetName) => sheetName !== "README").forEach(
  (sheetName) => {
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      blankrows: false,
    });

    if (rows.length < 1) {
      console.warn(`Skipping "${sheetName}" because it is empty.`);
      return;
    }

    // Row 1 = headers
    const headers = rows[0].map((header) => String(header).trim());

    // Row 2+ = data
    const dataRows = rows.slice(1);

    const jsonData = dataRows
      .filter((row) => row.some((cell) => String(cell).trim() !== ""))
      .map((row) => {
        const obj = {};

        headers.forEach((header, index) => {
          if (header) {
            obj[header] = row[index] ?? "";
          }
        });

        return obj;
      });

    const outputPath = path.join(outputDir, `${sheetName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

    console.log(`Created: ${outputPath}`);
  },
);

console.log("All sheets converted successfully.");
