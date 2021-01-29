const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

const {
  checkNewCard, checkCardId, checkDeletedCardId,
} = require('../utils/validation');

router.get('/cards', auth, getCards);

router.post('/cards', auth, checkNewCard, createCard);
router.delete('/cards/:id', auth, checkDeletedCardId, deleteCard);

router.put('/cards/:cardId/likes', auth, checkCardId, likeCard);
router.delete('/cards/:cardId/likes', auth, checkCardId, dislikeCard);

module.exports = router;
