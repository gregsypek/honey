const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const photoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: {
    type: String,
    required: [true, 'Galeria musi składać się ze zdjęć'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
// honeySchema.index({ slug: 1 });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
