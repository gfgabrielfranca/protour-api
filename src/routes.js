const express = require('express');
const TestController = require('./controllers/TestController');
const upload = require('../config/upload');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(process.env.APP_NAME || 'API');
});

routes.get('/test', TestController.index);
routes.post('/test', upload('image', ['jpeg', 'jpg', 'png']), TestController.store);
// routes.post('/upload', upload('image', ['jpeg', 'jpg', 'png']));

module.exports = routes;
