const multer = require('multer');
const models = require('../models');
const fileSystem = require('../utils/fileSystem');

module.exports = model => async (req, res, next) => {
  const { fields, file } = models[model].validateMiddleware;

  const upload = multer({ storage: multer.memoryStorage() }).single(file.field);

  upload(req, res, async () => {
    req.parsedBody = {};

    fields.forEach((field) => {
      req.parsedBody[field] = req.body[field];
    });

    let errors = fileSystem.validateFile(file.field, req.file, file.validate);

    try {
      await models[model].build(req.parsedBody).validate();
    } catch (err) {
      errors = errors.concat(err.errors.map(error => ({
        field: error.path,
        error: error.message,
      })));
    }

    if (errors.length) {
      res.send(errors);
    }

    next();
  });
};
