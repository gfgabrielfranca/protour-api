const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define('Test', {
    name: {
      allowNull: false,
      type: Sequelize.STRING(10),
      validate: {
        notNull: {
          msg: 'O campo name não pode ser vazio',
        },
        len: {
          args: [0, 10],
          msg: 'O campo name não pode passar de 10 caracteres',
        },
      },
    },
    image: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD h:mm:ss');
      },
    },
    updatedAt: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD h:mm:ss');
      },
    },
  });

  return Test;
};
