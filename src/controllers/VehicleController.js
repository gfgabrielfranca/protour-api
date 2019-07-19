const Vehicle = require('../models/Vehicle');

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  },

  async store(req, res) {
    const vehicle = await Vehicle.create(req.body);
    res.json(vehicle);
  },
};
