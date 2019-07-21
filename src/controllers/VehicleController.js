const { validateCreate } = require('../validators/vehicle');
const Vehicle = require('../models/Vehicle');

module.exports = {
  async index(req, res) {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  },

  async store(req, res) {
    try {
      const photo = req.files.find((file) => {
        if (file.fieldname === 'photo') {
          return file;
        }
        return null;
      });

      const body = await validateCreate({ ...req.body, photo });
      const vehicle = await Vehicle.create(body);
      return res.json(vehicle);
    } catch (error) {
      return res.json(error);
    }
  },

  async update(req, res) {
    // const privateAttributes = ['_id', 'createdAt', 'photoURL'];
    // delete req.body.id;

    // const vehicle = await Vehicle.updateOne(req.body);
    // res.json(req.body);
    try {
      const test = await Joi.validate(req.body, update, { abortEarly: false });
      return res.json(test);
    } catch (error) {
      return res.json(error);
    }
  },
};
