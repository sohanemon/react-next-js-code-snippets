const fs = require('fs');
const path = require('path');
console.log('Current working directory:', process.cwd());

function readAllJsonFiles(folderPath) {
  const jsonDataArray = [];

  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively read JSON files in subfolders
      const subfolderData = readAllJsonFiles(filePath);
      jsonDataArray.push(...subfolderData);
    } else if (file.endsWith('.code-snippets')) {
      console.log('->', file);

      // Read and parse JSON files
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      jsonDataArray.push(jsonData);
    }
  });

  return jsonDataArray;
}

function mergeAndWriteAllJsonFiles(inputFolderPath, outputFilePath) {
  // Read all JSON files in the folder and its subfolders
  const jsonDataArray = readAllJsonFiles(inputFolderPath);

  // Merge all JSON data into a single object
  const mergedData = Object.assign({}, ...jsonDataArray);

  // Convert the merged object back to JSON
  const allJson = JSON.stringify(mergedData, null, 2);

  // Write the result to all.json
  fs.writeFileSync(outputFilePath, allJson);

  console.log('Merged JSON written to', outputFilePath);
}

// const inputFolderPath =
//   '/home/sohanemon/Projects/react-next-js-code-snippets/snippet/src/snippets';

const inputFolderPath = 'src/snippets';
const outputFilePath = path.join(
  inputFolderPath,
  '../../dist/snippets.code-snippets'
);

console.log();
console.log('Bundling Starts ...');
console.log();
mergeAndWriteAllJsonFiles(inputFolderPath, outputFilePath);
console.log();
console.log('Bundling Done.');
