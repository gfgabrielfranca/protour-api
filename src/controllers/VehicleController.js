const { validateStore } = require('../validators/vehicleValidator');
const Vehicle = require('../models/Vehicle');

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  },

  async show(req, res) {
    res.json('show');
  },

  async store(req, res) {
    try {
      const body = await validateStore(req.body, req.files);
      //   const vehicle = await Vehicle.create(body);
      return res.send(body);
    } catch (error) {
      return res.json(error);
    }
  },

  async update(req, res) {
    res.json('update');
  },

  async destroy(req, res) {
    res.json('destroy');
  },
};
