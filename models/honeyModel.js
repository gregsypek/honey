const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

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
    slug: String,
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
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10, //set runs each time when there is new value
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    jarSizes: [Number],
    prices: [Number],
    image: {
      type: String,
      required: [true, 'A honey must have a cover image'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// honeySchema.index({ slug: 1 });

//Virtual populate
honeySchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'honey', //where local fields are equal
  localField: '_id', // to foreign field
});

honeySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

honeySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Honey = mongoose.model('Honey', honeySchema);

module.exports = Honey;
