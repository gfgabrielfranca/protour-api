const mongoose = require('mongoose');
const moment = require('moment');

const VehicleSchema = new mongoose.Schema({
  name: String,
  photo: String,
  description: String,
  activated: {
    type: Boolean,
    default: true,
  },
  price: Number,
  quantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
