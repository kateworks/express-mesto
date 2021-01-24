const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5fd7172deeb1f02214d978a9',
//   };
//   next();
// });

app.post('/signup', checkUser, createUser);
app.post('/signin', checkUser, login);

// Защита роутов авторизацией
app.use(auth);
app.use(routes);

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
