
const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getUsers, getUser, createUser };
