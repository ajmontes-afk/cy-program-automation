const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

function getArg(flag, fallback = null) {
  const index = args.indexOf(flag);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

const sourceDir =
  getArg("--source") || path.join("cypress", "fixtures", "excel");

const outputDir =
  getArg("--outdir") || path.join("cypress", "fixtures", "generated");

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(sourceDir)
  .filter((file) => file.toLowerCase().endsWith(".xlsx"));

if (files.length === 0) {
  console.error(`No .xlsx files found in ${sourceDir}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

files.forEach((fileName) => {
  const workbookPath = path.join(sourceDir, fileName);
  const workbook = xlsx.readFile(workbookPath);

  const jsonOutput = {};
  workbook.SheetNames.filter((name) => name !== "README").forEach(
    (sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      jsonOutput[sheetName] = xlsx.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: false,
      });
    },
  );

  const outputFileName = `${path.basename(fileName, ".xlsx")}.json`;
  const outputPath = path.join(outputDir, outputFileName);

  fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`Created ${outputPath}`);
});

console.log("All Excel files converted successfully.");
