const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        const regex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return regex.test(v);
      },
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
