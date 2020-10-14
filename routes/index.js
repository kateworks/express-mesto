const router = require('express').Router();

const cardsRouter = require('./cards.js');
const usersRouter = require('./users.js');
const notFoundRouter = require('./not-found.js');

router.use(
  usersRouter,
  cardsRouter,
  notFoundRouter,
);

module.exports = router;
