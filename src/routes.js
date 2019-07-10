const express = require('express');
const validatePage = require('./middlewares/validatePage');
const validateCreate = require('./middlewares/validateCreate');
const VehicleController = require('./controllers/VehicleController');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/vehicles/:id', VehicleController.show);
routes.get('/vehicles', validatePage, VehicleController.index);
routes.post('/vehicles', validateCreate('Vehicle'), VehicleController.store);
routes.put('/vehicles/:id', VehicleController.update);
routes.delete('/vehicles/:id', VehicleController.destroy);

module.exports = routes;
