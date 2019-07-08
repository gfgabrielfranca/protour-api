const fs = require('fs');
const file = require('../utils/file');
const { Vehicle } = require('../models');

const parseBody = (body) => {
  const parsedBody = body;

  delete parsedBody.id;
  delete parsedBody.photo;
  delete parsedBody.createdAt;
  delete parsedBody.updatedAt;

  return parsedBody;
};

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.send(vehicles);
  },

  async store(req, res) {
    try {
      const body = parseBody(req.body);

      const vehicle = await Vehicle.create(body);

      const photo = await file.upload('vehicles', req.file);

      await vehicle.set({ photo }).save();

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
      const vehicle = await Vehicle.findByPk(req.params.id);

      if (!vehicle) {
        return res.status(404).send({
          errors: [{ error: 'vehicle not found' }],
        });
      }

      const body = parseBody(req.body);

      await vehicle.set(body).save();

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
