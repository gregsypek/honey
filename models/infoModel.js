const mongoose = require('mongoose');
const validator = require('validator');

const infoSchema = new mongoose.Schema({
  attention: String,
  dispatchHours: Array,
  bankAccount: {
    type: Number,
    required: [true, 'Please provide your bank account'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    validate: [
      validator.isMobilePhone,
      'pl-PL',
      'Please provide a valid phone number',
    ],
  },
  economyPrice: [Number],
  priorityPrice: [Number],
  jarsQuantity: [String],
  wageMaximum: [Number],
  orderExtent: String,
  orderTime: String,
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
