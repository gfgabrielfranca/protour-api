module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Reservations', 'reservationLocation', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: true,
    }),
    queryInterface.addColumn('Reservations', 'devolutionLocation', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: true,
    }),
  ]),
  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Reservations', 'devolutionLocation'),
    queryInterface.removeColumn('Reservations', 'reservationLocation'),
  ]),
};
