const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/users');
const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5fd7172deeb1f02214d978a9',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
