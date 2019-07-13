const fileSystem = require('../utils/fileSystem');
const { Vehicle } = require('../models');

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.paginate(req.query.page, 2);

    return res.send(vehicles);
  },

  async store(req, res) {
    let errors = fileSystem.validateFile('photo', req.file, true, 1, ['jpeg', 'jpg', 'png']);

    try {
      await Vehicle.build(req.body).validate();
    } catch (err) {
      errors = errors.concat(err.errors.map(error => ({
        field: error.path,
        error: error.message,
      })));
    }

    if (errors.length) {
      return res.status(400).send(errors);
    }

    const vehicle = await Vehicle.create(req.body);

    const photo = await fileSystem.upload('vehicles', req.file);

    await vehicle.set({ photo }).save();

    return res.send(vehicle);
  },

  async show(req, res) {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).send({
        errors: [{ error: 'vehicle not found' }],
      });
    }

    return res.send(vehicle);
  },

  async update(req, res) {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).send({
        errors: [{ error: 'vehicle not found' }],
      });
    }

    let errors = fileSystem.validateFile('photo', req.file, false, 1, ['jpeg', 'jpg', 'png']);

    try {
      await vehicle.set(req.body).validate();
    } catch (err) {
      errors = errors.concat(err.errors.map(error => ({
        field: error.path,
        error: error.message,
      })));
    }

    if (errors.length) {
      return res.status(400).send(errors);
    }

    await vehicle.save();

    if (req.file) {
      await fileSystem.upload('vehicles', req.file, vehicle.photo);
    }

    return res.send(vehicle);
  },

  async destroy(req, res) {
    const result = await Vehicle.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      return res.status(404).send({
        errors: [{ error: 'vehicle not found' }],
      });
    }

    return res.send();
  },
};
