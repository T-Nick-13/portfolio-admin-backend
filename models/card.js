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
  }/* ,
  cardId: {
    type: Number,
    required: true,
    unique: true,
  } */
});

module.exports = mongoose.model('card', cardSchema);