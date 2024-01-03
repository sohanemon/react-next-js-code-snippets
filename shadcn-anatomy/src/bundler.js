import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

console.log('Current working directory:', process.cwd());

function readAllJsonFiles(folderPath, depth = 0) {
  const jsonDataArray = [];

  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively read JSON files in subfolders
      const subfolderData = readAllJsonFiles(filePath, depth + 1);
      jsonDataArray.push(...subfolderData);
    } else if (file.endsWith('.code-snippets')) {
      console.log(
        chalk.green('  '.repeat(depth) + '->') + ' ' + chalk.blue(file)
      );

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

  console.log();
  console.log(
    chalk.yellow('Merged JSON written to'),
    chalk.cyan(outputFilePath)
  );
}

const inputFolderPath = 'src/snippets';
const outputFilePath = path.join(
  inputFolderPath,
  '../../dist/snippets.code-snippets'
);

console.log();
console.log(chalk.magenta('Bundling Starts ...'));
mergeAndWriteAllJsonFiles(inputFolderPath, outputFilePath);
console.log();
console.log(chalk.green('Bundling Done.'));
