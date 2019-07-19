const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: String,
  photoURL: String,
  description: String,
  activated: Boolean,
  price: Number,
  quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
