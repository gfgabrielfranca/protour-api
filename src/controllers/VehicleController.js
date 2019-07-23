const { Vehicle, Reservation } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const vehicles = await Vehicle.paginate(req.query.page, 10);

      vehicles.forEach((vehicle, index) => {
        // const vehiclesAvailable = await Reservation.count({
        //   where: { vehicleId: vehicle.id },
        // });

        vehicles[index].dataValues.vehiclesAvailable = 0;
      });

      return res.send(vehicles);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const vehicle = await Vehicle.customCreate(req.body, req.file);
      const vehiclesAvailable = await Reservation.count({
        where: { vehicleId: vehicle.id },
      });

      vehicle.vehiclesAvailable = vehiclesAvailable;
      return res.send(vehicle);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const vehicle = await Vehicle.show(req.params.id);
      return res.send(vehicle);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const vehicle = await Vehicle.customUpdate(req.params.id, req.body, req.file);
      return res.send(vehicle);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async destroy(req, res) {
    try {
      await Vehicle.customDestroy(req.params.id);
      return res.send();
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },
};
