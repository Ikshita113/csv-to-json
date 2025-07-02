// fs for reading and writting files
// path helps handle file paths 
import fs from "node:fs";
import path from "node:path";

// inputPath the file we are reading from 
//outputPath where we want our file 
const inputPath = path.join("/Users/Ikshita/javascript-basics", "data.csv");
const outputPath = path.join("/Users/Ikshita/javascript-basics", "data.json");

// Reads the csv file then takes a callback function if error it will stop the code and print error reading the csv file if not
// it will move to next part of the code 
fs.readFile(inputPath, "utf8", (error, data) => {
  if (error) {
    console.error("Error reading the CSV file:", error);
    return;
  }
// data.trim()- Removes extra whitespace at the start/end.
// .split("\n")- splits the csv file into array of lines. 
  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");
  
// slice(1) skips the header and works on data rows only and map is used to convert each row into an object.
  const jsonData = lines.slice(1).map((line) => {
    
//  In this firstly each line is split by commas. Then a new object is created and each header is paired with it's value(index)
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });

    return obj;
  });
// This helps to write in json file and we have then succesfully converted csv file in json file 
  fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error writing the JSON file:", err);
      return;
    }

    console.log("Successfully converted CSV to JSON!");
  });
});
