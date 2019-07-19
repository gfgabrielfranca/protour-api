const routes = require('express').Router();
const VehicleController = require('./controllers/VehicleController');

routes.get('/', (req, res) => res.send('Protour API'));

routes.get('/vehicles', VehicleController.index);
routes.post('/vehicles', VehicleController.store);

module.exports = routes;
