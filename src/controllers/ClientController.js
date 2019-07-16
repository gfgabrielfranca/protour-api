const { Client } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const clients = await Client.paginate(req.query.page, 10);
      return res.send(clients);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const client = await Client.customCreate(req.body);
      return res.send(client);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const client = await Client.show(req.params.id);
      return res.send(client);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const client = await Client.customUpdate(req.params.id, req.body);
      return res.send(client);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Client.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
