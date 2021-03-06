const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.status(STATUS_OK).send(data))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err.name.includes('ValidationError')) {
        throw new BadRequestError('Ошибка валидации данных');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет!');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new BadRequestError('Невозможно удалить данную карточку');
      }
      return Card.findByIdAndRemove(id);
    })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет!');
      }
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет!');
      }
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
};
