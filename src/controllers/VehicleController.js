const fs = require('fs');
const file = require('../utils/file');
const { Vehicle } = require('../models');

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.send(vehicles);
  },

  async store(req, res) {
    try {
      const {
        name, description, status, value,
      } = req.body;

      let vehicle = await Vehicle.create({
        name, description, status, value,
      });

      const photo = await file.upload('vehicles', req.file);

      vehicle = await vehicle.set({ photo }).save();

      return res.send(vehicle);
    } catch (err) {
      await fs.promises.unlink(req.file.path);

      const errors = err.errors.map(error => ({
        field: error.path,
        error: error.message,
      }));

      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (vehicle) {
      return res.send(vehicle);
    }

    return res.status(404).send({
      errors: [{ error: 'vehicle not found' }],
    });
  },

  async update(req, res) {
    try {
      let vehicle = await Vehicle.findByPk(req.params.id);

      if (!vehicle) {
        return res.status(404).send({
          errors: [{ error: 'vehicle not found' }],
        });
      }

      vehicle = await vehicle.set(req.body).save();

      if (req.file) {
        await file.upload('vehicles', req.file, vehicle.photo);
      }

      return res.send(vehicle);
    } catch (err) {
      if (req.file) {
        await fs.promises.unlink(req.file.path);
      }

      const errors = err.errors.map(error => ({
        field: error.path,
        error: error.message,
      }));

      return res.status(400).send({ errors });
    }
  },

  async destroy(req, res) {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).send({
        errors: [{ error: 'vehicle not found' }],
      });
    }

    await vehicle.destroy();
    await file.delete(vehicle.photo);

    return res.send();
  },
};
