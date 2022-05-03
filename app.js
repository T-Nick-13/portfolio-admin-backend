const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/cards');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const path = require('path');

const { PORT = 3001 } = process.env;
const app = express(); 

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  /* useCreateIndex: true,
    useFindAndModify: false */
});

app.use(express.static(path.join(__dirname, './public')));

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 