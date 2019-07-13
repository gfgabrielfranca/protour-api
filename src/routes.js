const express = require('express');
const multer = require('multer');
const CarController = require('./controllers/CarController');

const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/cars/:id', CarController.show);
routes.get('/cars', CarController.index);
routes.post('/cars', upload.single('photo'), CarController.store);
routes.put('/cars/:id', upload.single('photo'), CarController.update);
routes.delete('/cars/:id', CarController.destroy);

module.exports = routes;
