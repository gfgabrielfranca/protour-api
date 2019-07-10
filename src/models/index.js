const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
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

  db[modelName].findById = async (id) => {
    if (!Number.isInteger(+id) || +id < 1) {
      throw new Error('invalid id');
    }

    const result = await db[modelName].findByPk(id);

    if (!result) {
      throw new Error(`${modelName} not found`);
    }

    return result;
  };
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
