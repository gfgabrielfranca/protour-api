module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Clients', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    nationality: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    document: {
      type: Sequelize.ENUM('CPF', 'Passaporte', 'Estrangeiro'),
      allowNull: false,
    },
    documentNumber: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Clients'),
};
