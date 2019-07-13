
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const pluralize = require('pluralize');
const fileSystem = require('../utils/fileSystem');
const config = require('../../config/database.js');

const db = {};
const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  db[modelName].paginate = async (page, limit, include) => {
    if (page) {
      if (page && (!Number.isInteger(+page) || +page < 1)) {
        const errors = {
          errors: [{ error: 'invalid page' }],
        };

        throw (errors);
      }

      const offset = (page - 1) * limit;

      const paginate = await db[modelName].findAndCountAll({
        limit, offset, order: [['createdAt', 'DESC']], include,
      });

      paginate.total = paginate.count;
      paginate.perPage = limit;
      paginate.page = +page;
      paginate.lastPage = Math.ceil(paginate.total / limit);
      paginate.data = paginate.rows;
      delete paginate.count;
      delete paginate.rows;

      return paginate;
    }

    const response = await db[modelName].findAll({
      order: [['createdAt', 'DESC']], include,
    });

    return response;
  };

  db[modelName].validationFailed((instance, options, error) => {
    const errors = error.errors.map(err => ({
      field: err.path,
      error: err.message,
    }));

    throw (errors);
  });

  db[modelName].customCreate = async (body, file, include) => {
    const { field, validate } = db[modelName].file;

    let errors;
    if (file) {
      errors = fileSystem.validateFile(field, file, validate);
    }

    try {
      await db[modelName].build(body).validate();
    } catch (error) {
      errors = errors.concat(error);
    }

    if (errors.length) {
      throw (errors);
    }

    const model = await db[modelName].create(body, { include });

    if (file) {
      const filePath = await fileSystem.upload(pluralize(modelName.toLowerCase()), file);

      await model.set({ [field]: filePath }).save();
    }

    return model;
  };

  db[modelName].customDestroy = async (id) => {
    if (id && (!Number.isInteger(+id) || +id < 1)) {
      const error = {
        status: 400,
        errors: {
          errors: [{ error: 'invalid id' }],
        },
      };

      throw (error);
    }

    const result = await db[modelName].findByPk(id);

    if (!result) {
      const error = {
        status: 404,
        errors: {
          errors: [{ error: `${modelName.toLowerCase()} not found` }],
        },
      };

      throw (error);
    }

    await result.destroy();

    if (!db[modelName].file) {
      await fileSystem.delete(result[db[modelName].file.field]);
    }
  };

  db[modelName].show = async (id) => {
    if (id && (!Number.isInteger(+id) || +id < 1)) {
      const error = {
        status: 400,
        errors: {
          errors: [{ error: 'invalid id' }],
        },
      };

      throw (error);
    }

    const result = await db[modelName].findByPk(id);

    if (!result) {
      const error = {
        status: 404,
        errors: {
          errors: [{ error: `${modelName.toLowerCase()} not found` }],
        },
      };
      throw (error);
    }

    return result;
  };
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
