const fsPromises = require('fs').promises;

module.exports = (fileUrl) => fsPromises.readFile(fileUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));
