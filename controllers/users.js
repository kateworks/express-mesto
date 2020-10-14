const path = require('path');
const readFile = require('../utils/read-file.js');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(dataPath)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  readFile(dataPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === id);
      return userToFind;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getUsers, getUser };
