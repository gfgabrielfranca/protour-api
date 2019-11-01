const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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
          msg: 'name cannot be empty',
        },
        len: {
          args: [0, 256],
          msg: 'name cannot be longer than 256 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null',
        },
        notEmpty: {
          msg: 'email cannot be empty',
        },
        isEmail: {
          msg: 'email is not a valid email',
        },
        len: {
          args: [0, 256],
          msg: 'email cannot be longer than 256 characters',
        },
      },
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phone cannot be null',
        },
        notEmpty: {
          msg: 'phone cannot be empty',
        },
        len: {
          args: [0, 30],
          msg: 'phone cannot be longer than 30 characters',
        },
      },
    },
    nationality: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'nationality cannot be null',
        },
        notEmpty: {
          msg: 'nationality cannot be empty',
        },
        len: {
          args: [0, 256],
          msg: 'nationality cannot be longer than 256 characters',
        },
      },
    },
    document: {
      type: DataTypes.ENUM('CPF', 'Passaporte', 'Estrangeiro'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'document cannot be null',
        },
        notEmpty: {
          msg: 'document cannot be empty',
        },
        isIn: {
          args: [['CPF', 'Passaporte', 'Estrangeiro']],
          msg: 'document should be equal to CPF, Passaporte, Estrangeiro',
        },
      },
    },
    documentNumber: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'documentNumber cannot be null',
        },
        notEmpty: {
          msg: 'documentNumber cannot be empty',
        },
        len: {
          args: [0, 256],
          msg: 'documentNumber cannot be longer than 256 characters',
        },
      },
    },
    address: {
      type: DataTypes.STRING(256),
      validate: {
        notEmpty: {
          msg: 'address cannot be empty',
        },
        len: {
          args: [0, 256],
          msg: 'address cannot be longer than 256 characters',
        },
      },
    },
  });

  //   Client.associate = (models) => {
  //     Client.belongsTo(models.Reservation, {
  //       through: 'Reservations',
  //     //   as: 'reservations',
  //     });
  //   };

  const parseClient = (client) => {
    const parsedCient = client;

    delete parsedCient.dataValues.id;

    return parsedCient;
  };

  Client.beforeCreate(parseClient);

  return Client;
};
