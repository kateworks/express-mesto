const path = require('path');
const readFile = require('../utils/read-file.js');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(dataPath)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getCards };
