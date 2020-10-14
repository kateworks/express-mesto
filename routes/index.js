const router = require('express').Router();

const cardsRouter = require('./cards.js');
const usersRouter = require('./users.js');

router.use(usersRouter, cardsRouter);

module.exports = router;
