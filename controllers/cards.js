
const Card = require('../models/card');
const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_SERVER,
} = require('../utils/constants');


const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(STATUS_OK).send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err.name.includes('ValidationError')) {
        res.status(ERROR_BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(ERROR_SERVER).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getCards, createCard, deleteCard };
