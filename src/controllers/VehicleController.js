const { Vehicle, Reservation } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const vehicles = await Vehicle.paginate(req.query.page, 10);

      const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index += 1) {
          /* eslint-disable no-await-in-loop */
          await callback(array[index], index, array);
        }
      };

      const start = async () => {
        await asyncForEach(vehicles, async (vehicle, index) => {
          const vehiclesInUse = await Reservation.count({
            where: { vehicleId: vehicle.id },
          });

          vehicles[index].dataValues.vehiclesInUse = vehiclesInUse;
        });


        return res.send(vehicles);
      };

      return start();
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const vehicle = await Vehicle.customCreate(req.body, req.file);
      vehicle.dataValues.vehiclesInUse = 0;
      return res.send(vehicle);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const vehicle = await Vehicle.show(req.params.id);

      const vehiclesInUse = await Reservation.count({
        where: { vehicleId: vehicle.id },
      });

      vehicle.dataValues.vehiclesInUse = vehiclesInUse;

      return res.send(vehicle);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const vehicle = await Vehicle.customUpdate(req.params.id, req.body, req.file);

      const vehiclesInUse = await Reservation.count({
        where: { vehicleId: vehicle.id },
      });

      vehicle.dataValues.vehiclesInUse = vehiclesInUse;

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
