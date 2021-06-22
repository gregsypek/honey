const mongoose = require('mongoose');

const honeySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A honey must have a name'],
      unique: true,
      maxLength: [
        40,
        'A honey name must have less or equal then 40 characters',
      ],
      minLength: [
        10,
        'A honey name must have more or equal then 10 characters',
      ],
    },
    shortDescription: {
      type: String,
      trim: true,
      required: [true, 'A honey must have a short information'],
      maxLength: [
        200,
        'A honey short description must have less or equal then 200 characters',
      ],
      minLength: [
        50,
        'A honey short description must have more or equal then 50 characters',
      ],
    },
    longDescription: {
      type: String,
      trim: true,
      required: [true, 'A honey must have a long description'],
      minLength: [
        100,
        'A honey long description must have more or equal then 100 characters',
      ],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price350: {
      type: Number,
      required: [true, 'A 350ml honey jar must have a price'],
    },
    price720: {
      type: Number,
      required: [true, 'A 720ml honey jar must have a price'],
    },
    price900: {
      type: Number,
      required: [true, 'A 900ml honey jar must have a price'],
    },
    image: {
      type: String,
      required: [true, 'A honey must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Honey = mongoose.model('Honey', honeySchema);

module.exports = Honey;
