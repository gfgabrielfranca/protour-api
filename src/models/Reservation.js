const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
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
  });

  Reservation.associate = (models) => {
    Reservation.belongsToMany(models.Service, {
      through: 'ServiceReservation',
      as: 'services',
    });
  };

  const parseReservation = (reservation) => {
    const parsedReservation = reservation;

    delete parsedReservation.dataValues.id;

    return parsedReservation;
  };

  Reservation.beforeCreate(parseReservation);

  return Reservation;
};
