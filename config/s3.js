const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

async function upload(file) {
  if (process.env.NODE_ENV === 'production') {
    const response = await s3.upload({
      Bucket: process.env.S3_BUCKET,
      ACL: 'public-read',
      ContentType: file.mimetype,
      Key: file.filename,
      Body: fs.createReadStream(file.path),
    }).promise();

    await fs.promises.unlink(file.path);

    return response.Location;
  }

  return `${process.env.APP_URL}/files/${file.filename}`;
}

module.exports.upload = upload;
