const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');

AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const getKey = (filePath) => {
  const file = filePath.split('/');
  return file[file.length - 1];
};

const getFolder = (filePath) => {
  const file = filePath.split('/');
  return file[file.length - 2];
};

const generateKey = file => new Promise((resolve) => {
  crypto.pseudoRandomBytes(16, (err, raw) => {
    resolve(`${raw.toString('hex') + Date.now()}.${mime.getExtension(file.mimetype)}`);
  });
});

module.exports.upload = async (folder, file, lastFile) => {
  let key;

  if (lastFile) {
    key = getKey(lastFile);
  } else {
    key = await generateKey(file);
  }

  if (process.env.NODE_ENV === 'production') {
    const response = await s3.upload({
      Bucket: process.env.S3_BUCKET,
      ACL: 'public-read',
      ContentType: file.mimetype,
      Key: `${folder}/${key}`,
      Body: file.buffer,
    }).promise();

    return response.Location;
  }
  await fs.promises.writeFile(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', folder, key), file.buffer);

  return `${process.env.APP_URL}/files/${folder}/${key}`;
};

module.exports.delete = async (file) => {
  const key = getKey(file);
  const folder = getFolder(file);

  if (process.env.NODE_ENV === 'production') {
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: `${folder}/${key}`,
    }).promise();

    return;
  }

  await fs.promises.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', folder, key));
};

module.exports.validateFile = (field, file, validations) => {
  const errors = [];

  const { required, maxSize, extensions } = validations;

  if (!file && required) {
    errors.push({
      field,
      error: `${field} was not passed`,
    });
  } else if (file) {
    if (file.size > maxSize * 1024 * 1024) {
      errors.push({
        field,
        error: `${field} must be less than ${maxSize}mb`,
      });
    }

    if (!extensions.includes(mime.getExtension(file.mimetype))) {
      errors.push({
        field,
        error: `${field} must be of the types: ${extensions.join(', ')}`,
      });
    }
  }

  return errors;
};
