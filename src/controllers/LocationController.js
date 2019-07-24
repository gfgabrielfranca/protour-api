const { Location } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const locations = await Location.paginate(req.query.page, 10);
      return res.send(locations);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const location = await Location.customCreate(req.body);
      return res.send(location);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const location = await Location.show(req.params.id);
      return res.send(location);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const location = await Location.customUpdate(req.params.id, req.body);
      return res.send(location);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Location.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
