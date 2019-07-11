const express = require('express');
const multer = require('multer');
const VehicleController = require('./controllers/VehicleController');

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

module.exports = routes;
