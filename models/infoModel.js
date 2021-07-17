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
  upTo2: [Number],
  upTo5: [Number],
  upTo10: [[Number], Number],
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
