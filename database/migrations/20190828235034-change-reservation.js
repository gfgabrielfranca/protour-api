module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Reservations', 'totalValue', {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  }),
  down: queryInterface => queryInterface.removeColumn('Reservations', 'totalValue'),
};
