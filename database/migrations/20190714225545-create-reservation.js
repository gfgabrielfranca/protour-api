module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reservations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    reservation: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    devolution: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.ENUM('PENDENTE', 'COMPLETO', 'CANCELADO', 'EXPIRADO'),
      allowNull: false,
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    vehicleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Vehicles',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
  down: queryInterface => queryInterface.dropTable('Reservations'),
};
