const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100, 
  },
  tag: {
    type: String,
  },
  link: {
    type: String,
    unique: true
  },
  filePath: {
    type: String,
  },
  mainPage: {
    type: Boolean,
  },
  index: {
    type: Number,
  }
});

module.exports = mongoose.model('card', cardSchema);