const { Service, Reservation } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const services = await Service.paginate(req.query.page, 10);

      const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index += 1) {
          /* eslint-disable no-await-in-loop */
          await callback(array[index], index, array);
        }
      };

      const start = async () => {
        await asyncForEach(services, async (vehicle, index) => {
          const servicesInUse = await Reservation.count({
            where: { vehicleId: vehicle.id },
          });

          services[index].dataValues.servicesInUse = servicesInUse;
        });


        return res.send(services);
      };

      return start();
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async store(req, res) {
    try {
      const service = await Service.customCreate(req.body, req.file);
      service.dataValues.servicesInUse = 0;
      return res.send(service);
    } catch (errors) {
      return res.status(400).send({ errors });
    }
  },

  async show(req, res) {
    try {
      const service = await Service.show(req.params.id);

      const servicesInUse = await Reservation.count({
        where: { vehicleId: service.id },
      });

      service.dataValues.servicesInUse = servicesInUse;

      return res.send(service);
    } catch (error) {
      return res.status(error.status).send(error.errors);
    }
  },

  async update(req, res) {
    try {
      const service = await Service.customUpdate(req.params.id, req.body, req.file);

      const servicesInUse = await Reservation.count({
        where: { vehicleId: service.id },
      });

      service.dataValues.servicesInUse = servicesInUse;

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
