const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_NOT_FOUND,
  ERROR_BAD_REQUEST,
  ERROR_BAD_DATA,
  ERROR_EXISTS,
  ERROR_SERVER,
} = require('../utils/constants');

// ----------------------------------------------------------------------------
// Создание учетной записи нового пользователя
// ----------------------------------------------------------------------------
module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!email || !password) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Нужны имя и пароль' });
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(ERROR_EXISTS).send({ message: 'Такой пользователь уже существует!' });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

// ----------------------------------------------------------------------------
// Вход в систему
// ----------------------------------------------------------------------------
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Нужны имя и пароль' });
  }

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_BAD_DATA).send({ message: 'Такой пользователь не существует!' });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((isValid) => {
      if (isValid) {
        return res.status(STATUS_OK).send({ message: 'ok' });
      }
      return res.status(ERROR_BAD_DATA).send({ message: 'Такой пользователь не существует!' });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

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
