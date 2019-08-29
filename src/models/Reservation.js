const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    totalValue: {
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
        return +Number(this.getDataValue('totalValue')).toFixed(2);
      },
    },
    reservation: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: {
          msg: 'reservation cannot be null',
        },
        isDate: {
          msg: 'reservation must be za date',
        },
      },
      get() {
        return moment(this.getDataValue('reservation')).format('YYYY-MM-DD HH:mm');
      },
    },
    devolution: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: {
          msg: 'devolution cannot be null',
        },
        isDate: {
          msg: 'devolution must be a date',
        },
        isAfterCustom(value) {
          if (!moment(value).isAfter(this.reservation)) {
            throw new Error('devolution must be after reservation');
          }
        },
      },
      get() {
        return moment(this.getDataValue('devolution')).format('YYYY-MM-DD HH:mm');
      },
    },
    status: {
      type: DataTypes.ENUM('PENDENTE', 'COMPLETO', 'CANCELADO', 'EXPIRADO'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'status cannot be null',
        },
        isIn: {
          args: [['PENDENTE', 'APROVADO', 'CANCELADO']],
          msg: 'status should be equal to PENDENTE, COMPLETO, CANCELADO, EXPIRADO',
        },
      },

    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'clientId cannot be null',
        },
        isNumeric: {
          msg: 'clientId must be numeric',
        },
      },
    },
    reservationLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'reservationLocation cannot be null',
        },
        isNumeric: {
          msg: 'reservationLocation must be numeric',
        },
      },
    },
    devolutionLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'devolutionLocation cannot be null',
        },
        isNumeric: {
          msg: 'devolutionLocation must be numeric',
        },
      },
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'vehicleId cannot be null',
        },
        isNumeric: {
          msg: 'vehicleId must be numeric',
        },
      },
    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsToMany(models.Service, {
      through: 'ServiceReservation',
      as: 'services',
    });

    Reservation.belongsTo(models.Client, {
      as: 'client',
    });

    Reservation.belongsTo(models.Vehicle, {
      as: 'vehicle',
    });

    Reservation.belongsTo(models.Location, {
      as: 'reservationLocations',
      foreignKey: 'reservationLocation',

    });

    Reservation.belongsTo(models.Location, {
      as: 'devolutionLocations',
      foreignKey: 'devolutionLocation',
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
