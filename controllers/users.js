
const User = require('../models/user.js');
const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send({ data: users }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        const errorMessage = `Пользователь с идентификатором ${id} не найден`;
        res.status(ERROR_NOT_FOUND).send({ message: errorMessage });
        return;
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};
