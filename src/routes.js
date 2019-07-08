const express = require('express');
const VehicleController = require('./controllers/VehicleController');
const multer = require('../config/multer');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/vehicles/:id', VehicleController.show);
routes.get('/vehicles', VehicleController.index);
routes.post('/vehicles', multer('vehicles', 'photo', ['jpeg', 'jpg', 'png']), VehicleController.store);
routes.put('/vehicles/:id', multer('vehicles', 'photo', ['jpeg', 'jpg', 'png']), VehicleController.update);
routes.delete('/vehicles/:id', VehicleController.destroy);

module.exports = routes;
