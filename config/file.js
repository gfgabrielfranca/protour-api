const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

function getKey(filePath) {
  const file = filePath.split('/');
  return file[file.length - 1];
}

function getFolder(filePath) {
  const file = filePath.split('/');
  return file[file.length - 2];
}

module.exports.upload = async (folder, file, lastFile) => {
  let key = file.filename;

  if (lastFile) {
    key = getKey(lastFile);
  }

  if (process.env.NODE_ENV === 'production') {
    const response = await s3.upload({
      Bucket: process.env.S3_BUCKET,
      ACL: 'public-read',
      ContentType: file.mimetype,
      Key: `${folder}/${key}`,
      Body: fs.createReadStream(file.path),
    }).promise();

    await fs.promises.unlink(file.path);

    return response.Location;
  }

  if (lastFile) {
    const lastPath = path.resolve(__dirname, '..', 'tmp', 'uploads', folder, key);

    await fs.promises.unlink(lastPath);
    await fs.promises.rename(file.path, lastPath);
  }

  return `${process.env.APP_URL}/files/${folder}/${key}`;
};

module.exports.delete = async (file) => {
  const key = getKey(file);
  const folder = getFolder(file);

  if (process.env.NODE_ENV === 'production') {
    const response = await s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: `${folder}/${key}`,
    }).promise();

    return response;
  }

  const response = await fs.promises.unlink(path.resolve(__dirname, '..', 'tmp', 'uploads', folder, key));

  return response;
};
