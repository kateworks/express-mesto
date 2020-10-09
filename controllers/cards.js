const path = require('path');
const readFile = require('../utils/read-file.js');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(dataPath)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

module.exports = { getCards };
