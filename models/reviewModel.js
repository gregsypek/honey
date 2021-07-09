const mongoose = require('mongoose');
const Honey = require('./honeyModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, "Review can't be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    honey: {
      type: mongoose.Schema.ObjectId,
      ref: 'Honey',
      required: [true, 'Review must belong to a honey'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'honey',
  //   select: 'name',
  // }).populate({
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
//use static method here because we need call aggregate on the Model
reviewSchema.statics.calcAverageRatings = async function (honeyId) {
  const stats = await this.aggregate([
    {
      $match: { honey: honeyId },
    },
    {
      $group: {
        _id: '$honey',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Honey.findByIdAndUpdate(honeyId, {
      //[ { _id: 60e743ab6188e3159f9c3b74, nRating: 2, avgRating: 3 } ]
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Honey.findByIdAndUpdate(honeyId, {
      //[ { _id: 60e743ab6188e3159f9c3b74, nRating: 2, avgRating: 3 } ]
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function (next) {
  //constructor is the model who created document
  //this points to current review
  this.constructor.calcAverageRatings(this.honey);
});

//findByIdAndUpdate
//findByIdAndDelete

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
});
reviewSchema.post(/^findOneAnd/, async function () {
  //await this.findOne(): doesnt work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.honey);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
