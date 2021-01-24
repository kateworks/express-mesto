const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

const {
  checkNewCard, checkCardId, checkDeletedCardId,
} = require('../utils/validation');

router.get('/cards', getCards);

router.post('/cards', checkNewCard, createCard);

router.delete('/cards/:id', checkDeletedCardId, deleteCard);

router.put('/cards/:cardId/likes', checkCardId, likeCard);
router.delete('/cards/:cardId/likes', checkCardId, dislikeCard);

module.exports = router;
