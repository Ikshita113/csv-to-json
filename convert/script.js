import fs from "node:fs";
import path from "node:path";

const inputPath = path.join("/Users/Ikshita/javascript-basics/convert", "script.csv");
const outputPath = path.join("/Users/Ikshita/javascript-basics/convert", "script.json");

fs.readFile(inputPath, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading the CSV file:", error);
    return;
  }

  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");

  const jsonData = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};

    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });

    return obj;
  });

  fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error writing the JSON file:", err);
      return;
    }

    console.log("Successfully converted CSV to JSON!");
  });
});
