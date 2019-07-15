module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ServiceReservation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ReservationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Reservations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    ServiceId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Services',
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
  down: queryInterface => queryInterface.dropTable('ServiceReservation'),
};
