const {
  Reservation, Service, Client, Vehicle,
} = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const reservations = await Reservation.paginate(req.query.page, 10, [
        {
          model: Service,
          as: 'services',
          through: { attributes: [] },
        },
        {
          model: Client,
          as: 'client',
        },
        {
          model: Vehicle,
          as: 'vehicle',
        },
      ]);

      return res.send(reservations);
    } catch (errors) {
      return res.status(400).send(errors.message);
    }
  },

  async store(req, res) {
    try {
      let services;
      let data;

      if (req.body) {
        ({ services, ...data } = req.body);
      }

      const client = await Client.show(data.clientId);
      const vehicle = await Vehicle.show(data.vehicleId);

      const reservation = await Reservation.customCreate(data);
      await reservation.setServices(services);
      const servicesGet = await reservation.getServices();

      reservation.dataValues.services = servicesGet;
      reservation.dataValues.client = client;
      reservation.dataValues.vehicle = vehicle;

      return res.send(reservation);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const reservation = await Reservation.show(req.params.id, [
        {
          model: Service,
          as: 'services',
          through: { attributes: [] },
        },
        {
          model: Client,
          as: 'client',
        },
        {
          model: Vehicle,
          as: 'vehicle',
        },
      ]);
      return res.send(reservation);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      let services;
      let data;

      if (req.body) {
        ({ services, ...data } = req.body);
      }

      const reservation = await Reservation.customUpdate(req.params.id, data, req.file);
      return res.send(reservation);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Reservation.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
