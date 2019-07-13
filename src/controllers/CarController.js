const { Car } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const cars = await Car.paginate(req.query.page, 2);
      return res.send(cars);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const car = await Car.customCreate(req.body, req.file);
      return res.send(car);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const car = await Car.show(req.params.id);
      return res.send(car);
    } catch (error) {
      return res.status(error.status).send({ errors: error.errors });
    }
  },

  async update(req, res) {
    return res.send();
  },

  async destroy(req, res) {
    try {
      await Car.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send({ errors: error.errors });
    }
  },
};
