const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const routes = require('./routes/index.js');
const { checkUser } = require('./utils/validation');
const { ERROR_SERVER } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// для собирания JSON-формата
app.use(bodyParser.json());
// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Подключаем логгер запросов
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', checkUser, createUser);
app.post('/signin', checkUser, login);

app.use(routes);

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(errors());

// Централизованная обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
