const { Reservation, Service } = require('../models');

module.exports = {
  async index(req, res) {
    try {
    //   const reservations = await Reservation.paginate(req.query.page, 2, [
    //     {
    //       model: Service,
    //       as: 'services',
    //       through: { attributes: [] },
    //     },
    //   ]);

      const reservations = await Reservation.findAll({
        include: [
          {
            model: Service,
            as: 'services',
            through: { attributes: [] },
          },
        ],
      });
      return res.send(reservations);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      let services;
      let data;

      if (req.body) {
        ({ services, ...data } = req.body);
      }

      //   const reservation = await Reservation.customCreate(data, null, [
      //     {
      //       model: Service,
      //       as: 'services',
      //       through: { attributes: [] },
      //     },
      //   ]);

      const reservation = await Reservation.create(data);
      reservation.setServices(services);

      return res.send(reservation);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const reservation = await Reservation.show(req.params.id);
      return res.send(reservation);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const reservation = await Reservation.customUpdate(req.params.id, req.body, req.file);
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
