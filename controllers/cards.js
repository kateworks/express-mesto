
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getCards, createCard, deleteCard };
