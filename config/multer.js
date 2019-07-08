const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');

module.exports = (folder, field, extensions) => {
  const upload = multer({
    limits: {
      fileSize: 1 * 1024 * 1024,
      files: 1,
    },
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', 'tmp', 'uploads', folder),
      filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
          cb(null, `${raw.toString('hex') + Date.now()}.${mime.getExtension(file.mimetype)}`);
        });
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!extensions.includes(mime.getExtension(file.mimetype))) {
        cb(`Only ${extensions.join(', ')} files are allowed!`, false);
      } else {
        cb(null, true);
      }
    },
  }).single(field);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        res.status(400).send({
          errors: [{
            field: error.field,
            error: error.message,
          }],
        });
      } else if (error) {
        res.status(400).send({
          errors: [{
            field,
            error,
          }],
        });
      } else if (!req.file && !req.params.id) {
        res.status(400).send({
          errors: [{
            field,
            error: 'No file has been passed.',
          }],
        });
      }

      return next();
    });
  };
};
