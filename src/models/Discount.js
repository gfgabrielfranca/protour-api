const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
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
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'days cannot be null',
        },
        isNumeric: {
          msg: 'days must be numeric',
        },
        notEmpty: {
          msg: 'days can not be empty',
        },
        min: {
          args: 1,
          msg: 'days must be greater than 0',
        },
      },
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'percent cannot be null',
        },
        isNumeric: {
          msg: 'percent must be numeric',
        },
        notEmpty: {
          msg: 'percent can not be empty',
        },
        min: {
          args: 1,
          msg: 'percent must be greater than 0',
        },
        max: {
          args: 100,
          msg: 'percent must be less than 100',
        },
      },
    },
  });

  const parseDiscount = (discount) => {
    const parsedDiscount = discount;

    delete parsedDiscount.dataValues.id;

    return parsedDiscount;
  };

  Discount.beforeCreate(parseDiscount);

  return Discount;
};
