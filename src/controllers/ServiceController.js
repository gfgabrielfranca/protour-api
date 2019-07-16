const { Service } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const services = await Service.paginate(req.query.page, 10);
      return res.send(services);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const service = await Service.customCreate(req.body, req.file);
      return res.send(service);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const service = await Service.show(req.params.id);
      return res.send(service);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const service = await Service.customUpdate(req.params.id, req.body, req.file);
      return res.send(service);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Service.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
