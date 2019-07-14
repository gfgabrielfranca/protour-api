const express = require('express');
const multer = require('multer');
const VehicleController = require('./controllers/VehicleController');
const ServiceController = require('./controllers/ServiceController');
const ClientController = require('./controllers/ClientController');

const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/vehicles/:id', VehicleController.show);
routes.get('/vehicles', VehicleController.index);
routes.post('/vehicles', upload.single('photo'), VehicleController.store);
routes.put('/vehicles/:id', upload.single('photo'), VehicleController.update);
routes.delete('/vehicles/:id', VehicleController.destroy);

routes.get('/services/:id', ServiceController.show);
routes.get('/services', ServiceController.index);
routes.post('/services', upload.single('icon'), ServiceController.store);
routes.put('/services/:id', upload.single('icon'), ServiceController.update);
routes.delete('/services/:id', ServiceController.destroy);

routes.get('/clients/:id', ClientController.show);
routes.get('/clients', ClientController.index);
routes.post('/clients', upload.none(), ClientController.store);
routes.put('/clients/:id', upload.none(), ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

module.exports = routes;
