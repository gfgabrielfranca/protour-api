const { Discount } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const discounts = await Discount.paginate(req.query.page, 10);
      return res.send(discounts);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const discount = await Discount.customCreate(req.body);
      return res.send(discount);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const discount = await Discount.show(req.params.id);
      return res.send(discount);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const discount = await Discount.customUpdate(req.params.id, req.body);
      return res.send(discount);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Discount.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
