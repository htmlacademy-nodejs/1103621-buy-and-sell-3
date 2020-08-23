'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const FILE_NAME = `mocks.json`;
let data = [];

const getMockData = () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = fs.readFileSync(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.log(chalk.red(error));
  }

  return data;
};

module.exports = getMockData;
