const express = require('express');
const VehicleController = require('./controllers/VehicleController');
const upload = require('../config/upload');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/vehicles/:id', VehicleController.show);
routes.get('/vehicles', VehicleController.index);
routes.post('/vehicles', upload('vehicles', 'photo', ['jpeg', 'jpg', 'png']), VehicleController.store);
routes.put('/vehicles/:id', upload('vehicles', 'photo', ['jpeg', 'jpg', 'png']), VehicleController.update);

module.exports = routes;
