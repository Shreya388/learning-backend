const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    director: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
  );

  const User = mongoose.model('user', userSchema);

  module.exports = User;