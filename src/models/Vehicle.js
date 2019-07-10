const moment = require('moment');

// tentar omitir o objeto no define reutilizando objeto de migrations
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD hh:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD hh:mm:ss');
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null',
        },
        notEmpty: {
          msg: 'name can not be empty',
        },
        len: {
          args: [0, 128],
          msg: 'name can not be longer than 128 characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        isBoolean(value) {
          if (value !== true && value !== false && value !== '1' && value !== '0') {
            throw new Error('status must be boolean');
          }
        },
      },
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'value cannot be null',
        },
        isNumeric: {
          msg: 'value must be numeric',
        },
        notEmpty: {
          msg: 'value can not be empty',
        },
        min: {
          args: 1,
          msg: 'value must be greater than 0',
        },
        max: {
          args: 99999999.99,
          msg: 'value must be less than 99999999.99',
        },
      },
      get() {
        return +this.getDataValue('value');
      },
    },
  });

  Vehicle.validateMiddleware = {
    fields: ['name', 'description', 'status', 'value'],
    file: {
      field: 'photo',
      validate: {
        required: true,
        maxSize: 1,
        extensions: ['jpeg', 'jpg', 'png'],
      },
    },
  };

  return Vehicle;
};
