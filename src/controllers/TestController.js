const fs = require('fs');
const { upload } = require('../../config/s3');
const { Test } = require('../models');

module.exports = {
  async index(req, res) {
    const tests = await Test.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.send({ tests });
  },
  async store(req, res) {
    try {
      const { name } = req.body;

      const test = await Test.create({
        name,
      });

      const image = await upload(req.file);

      await Test.update(
        { image },
        { where: { id: test.id } },
      );
      test.image = image;

      return res.send(test);
    } catch (err) {
      await fs.promises.unlink(req.file.path);

      const errors = err.errors.map(error => error.message);

      return res.status(400).send({ errors });
    }
  },
};
