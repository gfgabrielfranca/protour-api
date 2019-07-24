const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
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
  });

  const parseLocation = (location) => {
    const parsedLocation = location;

    delete parsedLocation.dataValues.id;

    return parsedLocation;
  };

  Location.beforeCreate(parseLocation);

  return Location;
};
