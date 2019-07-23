const moment = require('moment');

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
      unique: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null',
        },
        notEmpty: {
          msg: 'name can not be empty',
        },
        len: {
          args: [0, 256],
          msg: 'name can not be longer than 256 characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING(256),
      validate: {
        notEmpty: {
          msg: 'description can not be empty',
        },
        len: {
          args: [0, 256],
          msg: 'description can not be longer than 256 characters',
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        isBoolean(value) {
          if (value !== true && value !== false) {
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
        return +Number(this.getDataValue('value')).toFixed(2);
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'quantity cannot be null',
        },
        isNumeric: {
          msg: 'quantity must be numeric',
        },
        notEmpty: {
          msg: 'quantity can not be empty',
        },
        min: {
          args: 1,
          msg: 'quantity must be greater than 0',
        },
        max: {
          args: 999999999,
          msg: 'quantity must be less than 999999999',
        },
      },
      get() {
        return +this.getDataValue('quantity');
      },
    },
  });

  Vehicle.file = {
    field: 'photo',
    validate: {
      required: true,
      maxSize: 1,
      extensions: ['jpeg', 'jpg', 'png'],
    },
  };

  const parseVehicle = (vehicle) => {
    const parsedVehicle = vehicle;

    delete parsedVehicle.dataValues.id;

    return parsedVehicle;
  };

  Vehicle.beforeCreate(parseVehicle);

  return Vehicle;
};
